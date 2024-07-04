import { injectable } from 'inversify';
import { Dispatch, SetStateAction } from 'react';
import { observable, makeObservable, action, runInAction } from 'mobx'
import RegistrationUseCase from '../../domain/use_case/RegistrationUseCase';
import { ErrorAPI, ResponseAPI } from '../../../../core/data/models/ResponseApi';
import { postEvent } from '../../../../core/presentation/utils/MobxUtils';
import { User } from '../../../../core/data/models/User';

export enum ExternalCardErrorType {
  ERROR_GENERIC,
  ERROR_TEMP_REGISTERED
}

@injectable()
class RegisterViewModel {

  @observable user: User;
  @observable registerSuccess: any
  @observable showError: any
  @observable phoneSuccess: any;
  @observable emailSuccess: any;

  constructor(
    private registrationUseCase: RegistrationUseCase,
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
    errorModal: (errorType: ExternalCardErrorType) => void
  ) {
    this.registrationUseCase
      .registerUser(name, lastname, birthDate, nationality, email, phone, password)
      .then((response: User) => {
        runInAction(() => {
          this.user = response
          this.registerSuccess = postEvent()
        })
      })
      .catch((error: ErrorAPI) => {
        console.log(JSON.stringify(error))
        if (error.code === 416) {
          errorModal(ExternalCardErrorType.ERROR_TEMP_REGISTERED)
        } else {
          errorModal(ExternalCardErrorType.ERROR_GENERIC)
        }
      });
  }

  @action
  resendSMS() {
    this.registrationUseCase
      .resendSMS(this.user)
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
  resendEmail() {
    this.registrationUseCase
      .resendEmail(this.user)
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


}

export default RegisterViewModel;
