import { injectable } from 'inversify';
import { observable, makeObservable, action, runInAction } from 'mobx'
import RegistrationUseCase from '../../domain/use_case/RegistrationUseCase';
import { ErrorAPI, ResponseAPI } from '../../../../core/data/models/ResponseApi';
import { postEvent } from '../../../../core/presentation/utils/MobxUtils';
import { User } from '../../../../core/data/models/User';
import { PresentationErrorTypes } from '../../../../core/presentation/utils/PresentationErrors';
import { AddressRegisterModel, FinancialRegisterModel } from './model/RegistrationModel';

export const DEFAULT_COUNTRY = "PA"
@injectable()
class RegisterViewModel {

  @observable user: User;
  @observable registerSuccess: any
  @observable showError: any
  @observable phoneSuccess: any;
  @observable emailSuccess: any;
  @observable step4Success: any;
  @observable step5Success: any;

  constructor(
    private mRegistrationUseCase: RegistrationUseCase,
  ) {
    makeObservable(this)
  }

  @action
  registerUser(
    name: string,
    lastname: string,
    birthDate: string,
    nationality: string,
    email: string,
    phone: string,
    password: string,
    errorModal: (errorType: PresentationErrorTypes) => void
  ) {
    this.mRegistrationUseCase
      .registerUser(name, lastname, birthDate, nationality, email, phone, password)
      .then((response: User) => {
        runInAction(() => {
          this.user = response
          this.user.password = password
          this.registerSuccess = postEvent()
        })
      })
      .catch((error: ErrorAPI) => {
        console.log(JSON.stringify(error))
        if (error.code === 416) {
          errorModal(PresentationErrorTypes.ERROR_TEMP_REGISTERED)
        } else {
          errorModal(PresentationErrorTypes.ERROR_GENERIC)
        }
      });
  }

  @action
  getSMSCode() {
    this.mRegistrationUseCase
      .getSMSCode(this.user)
      .catch((error: ErrorAPI) => {
        runInAction(() => {
          this.showError = postEvent()
        })
      });
  }

  @action
  setUser(
    user: User,
    password: string
  ) {
    runInAction(() => {
      user.password = password
      this.user = user
    })
  }

  @action
  sendSMSCode(
    code: string,
  ) {
    this.mRegistrationUseCase
      .sendSMSCode(this.user, code)
      .then((response: ResponseAPI) => {
        runInAction(() => {
          this.phoneSuccess = postEvent()
        })
      })
      .catch((error: ErrorAPI) => {
        runInAction(() => {
          this.showError = postEvent()
        })
      });
  }

  @action
  sendEmailCode(
    code: string,
  ) {
    this.mRegistrationUseCase
      .sendEmailCode(this.user, code)
      .then((user: User) => {
        runInAction(() => {
          this.emailSuccess = postEvent()
          if (this.user) {
            this.user = { ...this.user, ...user };
          } else {
            this.user = user;
          }
        })
      })
      .catch((error: ErrorAPI) => {
        runInAction(() => {
          this.showError = postEvent()
        })
      });
  }

  @action
  getEmailCode() {
    this.mRegistrationUseCase
      .getEmailCode(this.user)
      .catch((error: ErrorAPI) => {
        runInAction(() => {
          this.showError = postEvent()
        })
      });
  }

  @action
  registerStep4(
    address: AddressRegisterModel,
    financial: FinancialRegisterModel,
  ) {
    this.mRegistrationUseCase
      .registerStep4(this.user, address, financial)
      .then((response: ResponseAPI) => {
        runInAction(() => {
          this.step4Success = response.data
        })
      })
      .catch((error: ErrorAPI) => {
        runInAction(() => {
          this.showError = postEvent()
        })
      });
  }

  @action
  registerStep5(
    jobStatus?: string,
    jobPosition?: string,
    workplace?: string,
    company?: string,
    companyAge?: string,
    socialMedia?: string,
    website?: string,
    jobExperience?: number,
    seguro?: string,
    movements?: string,
    operacion?: string,
    renta?: string,
  ) {
    console.log("this.mRegistrationUseCase()")
    this.mRegistrationUseCase
      .registerStep5(
        this.user,
        jobStatus,
        jobPosition,
        workplace,
        company,
        companyAge,
        socialMedia,
        website,
        jobExperience,
        seguro,
        movements,
        operacion,
        renta,
      )
      .then((response: ResponseAPI) => {
        runInAction(() => {
          this.step5Success = postEvent()
        })
      })
      .catch((error: ErrorAPI) => {
        runInAction(() => {
          this.showError = postEvent()
        })
      });
  }


}

export default RegisterViewModel;
