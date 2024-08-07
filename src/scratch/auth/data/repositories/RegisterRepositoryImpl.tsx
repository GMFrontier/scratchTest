import { injectable } from 'inversify';
import RegisterRepository from '../../domain/repositories/RegisterRepository';
import { RegistrationModel, RegistrationStep5Model } from '../../presentation/register/model/RegistrationModel';
import { User } from '../../../../core/data/models/User';
import ApiService from '../../../../core/data/sources/remote/ApiService';
import { ResponseAPI } from '../../../../core/data/models/ResponseApi';
import EndPoints from '../../../../core/constants/EndPoints';
import { api } from '../../../../core/data/sources/remote/Api';
import Config from 'react-native-config';
import { SMSValidationModel, EmailValidationModel, RegisterSMSValidationModel, RegisterEmailValidationModel } from '../../presentation/register/model/SMSValidationModel';

@injectable()
class RegisterRepositoryImpl implements RegisterRepository {
  registerStep4(dto: any): Promise<ResponseAPI> {
    return new Promise<ResponseAPI>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.post<ResponseAPI>(
          EndPoints.REGISTER,
          dto,
        )
      })
        .then((result: ResponseAPI) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  sendEmailCode(dto: RegisterEmailValidationModel): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.post<ResponseAPI>(
          EndPoints.REGISTER,
          dto,
        )
      })
        .then((result: ResponseAPI) => {
          resolve(result.data.user as User);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  sendSMSCode(dto: RegisterSMSValidationModel): Promise<ResponseAPI> {
    return new Promise<ResponseAPI>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.post<ResponseAPI>(
          EndPoints.REGISTER,
          dto,
        )
      })
        .then((result: ResponseAPI) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getSMSCode(smsModel: SMSValidationModel): Promise<ResponseAPI> {
    return new Promise<ResponseAPI>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.post<ResponseAPI>(
          EndPoints.RESEND_SMS,
          smsModel,
        )
      })
        .then((result: ResponseAPI) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getEmailCode(emailModel: EmailValidationModel): Promise<ResponseAPI> {
    return new Promise<ResponseAPI>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.post<ResponseAPI>(
          EndPoints.RESEND_EMAIL,
          emailModel,
        )
      })
        .then((result: ResponseAPI) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  registerUser(
    registrationModel: RegistrationModel,
  ): Promise<User> {

    return new Promise<User>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.post<ResponseAPI>(
          EndPoints.REGISTER,
          registrationModel,
        )
      })
        .then((result: ResponseAPI) => {
          resolve(result.data as User);
        })
        .catch((error: any) => {
          console.log(JSON.stringify(error))
          reject(error);
        });
    });
  }

  registerStep5(
    id: string,
    dto: RegistrationStep5Model,
  ): Promise<ResponseAPI> {

    return new Promise<ResponseAPI>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.put<ResponseAPI>(
          EndPoints.REGISTER_STEP_5 + id,
          dto,
        )
      })
        .then((result: ResponseAPI) => {
          resolve(result.data);
        })
        .catch((error: any) => {
          console.log(JSON.stringify(error))
          reject(error);
        });
    });
  }
}

export default RegisterRepositoryImpl;
