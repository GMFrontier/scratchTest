import { injectable } from 'inversify';
import { observable, makeObservable, action, runInAction } from 'mobx'
import { ErrorAPI, ResponseAPI } from '../../../../core/data/models/ResponseApi';
import { postEvent } from '../../../../core/presentation/utils/MobxUtils';
import { User } from '../../../../core/data/models/User';
import LoginUseCase from '../../domain/use_case/LoginUseCase';
import PreferencesUseCase from '../../../../core/domain/use_case/PreferencesUseCase';

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
  @observable emailSuccess: any;

  constructor(
    private mLoginUseCase: LoginUseCase,
    private mPreferencesUseCase: PreferencesUseCase,
  ) {
    makeObservable(this)
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
          this.loginSuccess = postEvent()
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

  // @action
  // resendSMS() {
  //   this.registrationUseCase
  //     .resendSMS(this.user)
  //     .then((response: ResponseAPI) => {
  //       runInAction(() => {
  //         this.phoneSuccess = postEvent()
  //       })
  //     })
  //     .catch((error: ErrorAPI) => {
  //       runInAction(() => {
  //         this.showError = postEvent()
  //       })
  //     });
  // }

  // @action
  // resendEmail() {
  //   this.registrationUseCase
  //     .resendEmail(this.user)
  //     .then((response: ResponseAPI) => {
  //       runInAction(() => {
  //         this.emailSuccess = postEvent()
  //       })
  //     })
  //     .catch((error: ErrorAPI) => {
  //       runInAction(() => {
  //         this.showError = postEvent()
  //       })
  //     });
  // }


}

export default LoginViewModel;
