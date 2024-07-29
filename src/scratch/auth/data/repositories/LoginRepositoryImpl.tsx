import { injectable } from 'inversify';
import RegisterRepository from '../../domain/repositories/RegisterRepository';
import { RegistrationModel } from '../../presentation/register/model/RegistrationModel';
import { User } from '../../../../core/data/models/User';
import ApiService from '../../../../core/data/sources/remote/ApiService';
import { ResponseAPI } from '../../../../core/data/models/ResponseApi';
import EndPoints from '../../../../core/constants/EndPoints';
import { api } from '../../../../core/data/sources/remote/Api';
import Config from 'react-native-config';
import { SMSValidationModel, EmailValidationModel } from '../../presentation/register/model/SMSValidationModel';
import LoginRepository from '../../domain/repositories/LoginRepository';
import { LoginModel } from '../../presentation/login/model/LoginModel';
import { PasswordRecoveryStep2, PasswordRecoveryStep3 } from '../../../../core/data/models/PasswordRecoveryDto';

@injectable()
class LoginRepositoryImpl implements LoginRepository {
  sendNewPassword(dto: PasswordRecoveryStep3): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.post<ResponseAPI>(
          EndPoints.SET_NEW_PASSWORD,
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
  sendRecoveryCode(dto: PasswordRecoveryStep2): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.post<ResponseAPI>(
          EndPoints.VERIFY_RECOVERY_CODE,
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

  sendRecoveryEmail(dto: EmailValidationModel): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.post<ResponseAPI>(
          EndPoints.RECOVER_PASSWORD,
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

  login(dto: LoginModel): Promise<User> {

    return new Promise<User>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.post<ResponseAPI>(
          EndPoints.LOGIN,
          dto,
        )
      })
        .then((result: ResponseAPI) => {
          var user: User = result.data.user
          user.token = result.data.access_token
          resolve(user as User);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

}

export default LoginRepositoryImpl;
