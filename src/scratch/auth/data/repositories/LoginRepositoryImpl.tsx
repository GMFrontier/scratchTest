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

@injectable()
class LoginRepositoryImpl implements LoginRepository {
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
