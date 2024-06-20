import { injectable } from 'inversify';
import RegisterRepository from '../../domain/repositories/RegisterRepository';
import axios from 'axios';
import { RegistrationModel } from '../../presentation/register/model/RegistrationModel';
import { User } from '../../../../core/data/models/User';
import ApiService from '../../../../core/data/sources/remote/ApiService';
import { ResponseAPI } from '../../../../core/data/models/ResponseApi';
import EndPoints from '../../../../core/constants/EndPoints';
import { api } from '../../../../core/data/sources/remote/Api';
import Config from 'react-native-config';

@injectable()
class RegisterRepositoryImpl implements RegisterRepository {

  registerUser(
    registrationModel: RegistrationModel,
  ): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      axios.post(Config.BASE_URL + EndPoints.REGISTER, registrationModel)

        .then((result: any) => {
          console.log("22222")

          resolve(result.data as User);
        })
        .catch((error: any) => {
          console.log("JSON.stringify(error) 222")
          console.log(JSON.stringify(error))
          reject(error);
        });
      ApiService.apiCall(() => {
        return api.post<ResponseAPI>(
          EndPoints.REGISTER,
          registrationModel,
        )
      })
        .then((result: ResponseAPI) => {
          console.log("result")

          resolve(result.data as User);
        })
        .catch((error: any) => {
          console.log("JSON.stringify(error)")
          console.log(JSON.stringify(error))
          reject(error);
        });
    });
  }
}

export default RegisterRepositoryImpl;
