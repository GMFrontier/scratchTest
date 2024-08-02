import { injectable } from 'inversify';
import { observable, makeObservable, action, runInAction } from 'mobx'
import { ErrorAPI, ResponseAPI } from '../../../../core/data/models/ResponseApi';
import { postEvent } from '../../../../core/presentation/utils/MobxUtils';
import { User } from '../../../../core/data/models/User';
import LoginUseCase from '../../domain/use_case/LoginUseCase';
import PreferencesUseCase from '../../../../core/domain/use_case/PreferencesUseCase';
import { PresentationErrorTypes } from '../../../../core/presentation/utils/PresentationErrors';

export const REMEMBER_USER = "REMEMBER_USER"

export enum SplashLoginNav {
  EmptyUser,
  SavedUser,
  RememberUser,
}

@injectable()
class LoginViewModel {

  @observable user: User;
  @observable loginSuccess: any
  @observable showError: any
  @observable phoneSuccess: any;
  @observable sendCodeSuccess: any;
  @observable recoverPasswordSuccess: any;
  @observable emailSuccess: any;
  comesFromSettings: any;
  recoverPasswordEmail = ""

  constructor(
    private mLoginUseCase: LoginUseCase,
    private mPreferencesUseCase: PreferencesUseCase,
  ) {
    makeObservable(this)
  }

  setComesFromSettings() {
    this.comesFromSettings = true
  }

  clearComesFromSettings() {
    this.comesFromSettings = true
  }

  @action
  login(
    email: string,
    password: string,
  ) {
    this.mLoginUseCase.login(email, password)
      .then((response: User) => {
        runInAction(() => {
          this.user = response
          this.loginSuccess = response
        })
      })
      .catch((error: ErrorAPI) => {
        runInAction(() => {
          this.showError = postEvent()
        })
      });
  }

  async saveLoginPreference(remember: boolean) {
    var data = "0"
    if (remember) {
      data = "1"
    }

    await this.mPreferencesUseCase.save(REMEMBER_USER, data)
  }

  async handleFirstLoginScreen(
    handleNav: (data: SplashLoginNav) => void
  ) {
    this.user = await this.mPreferencesUseCase.getUser()
    const rememberUser = await this.mPreferencesUseCase.getPreference(REMEMBER_USER) ?? false

    if (rememberUser === "1") {
      handleNav(SplashLoginNav.RememberUser)
    } else {
      if (this.user) {
        handleNav(SplashLoginNav.SavedUser)
      } else {
        handleNav(SplashLoginNav.EmptyUser)
      }
    }
  }

  @action
  recoverPassword(
    email?: string,
  ) {
    if (email) this.recoverPasswordEmail = email
    this.mLoginUseCase
      .sendRecoveryEmail(this.recoverPasswordEmail)
      .then((response: ResponseAPI) => {
        runInAction(() => {
          this.emailSuccess = postEvent()
        })
      })
      .catch((error: ErrorAPI) => {
        runInAction(() => {
          this.showError = postEvent()
        })
      });
  }

  @action
  sendRecoverCode(
    code: string,
  ) {
    this.mLoginUseCase
      .sendEmailCode(this.recoverPasswordEmail, code)
      .then((response: ResponseAPI) => {
        runInAction(() => {
          this.sendCodeSuccess = postEvent()
        })
      })
      .catch((error: ErrorAPI) => {
        runInAction(() => {
          this.showError = postEvent()
        })
      });
  }

  @action
  sendNewPassword(
    newPassword: string,
    showError: (error: PresentationErrorTypes) => void,
  ) {
    this.mLoginUseCase
      .sendNewPassword(this.recoverPasswordEmail, newPassword)
      .then((response: ResponseAPI) => {
        runInAction(() => {
          this.recoverPasswordSuccess = postEvent()
        })
      })
      .catch((error: ErrorAPI) => {
        runInAction(() => {
          if (error.code === 416) {
            showError(PresentationErrorTypes.SAME_PASSWORD)
          } else {
            showError(PresentationErrorTypes.ERROR_GENERIC)
          }
        })
      });
  }
}

export default LoginViewModel;
