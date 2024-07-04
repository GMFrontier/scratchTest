import { inject, injectable } from 'inversify';
import { TYPES } from '../../../di/types';
import { User } from '../../../../core/data/models/User';
import { RegistrationModel } from '../../presentation/register/model/RegistrationModel';
import RegisterRepository from '../repositories/RegisterRepository';
import { EmailValidationModel, SMSValidationModel } from '../../presentation/register/model/SMSValidationModel';
import { ResponseAPI } from '../../../../core/data/models/ResponseApi';
import { LoginModel } from '../../presentation/login/model/LoginModel';
import LoginRepository from '../repositories/LoginRepository';
import LocalRepository from '../../../../core/domain/repository/LocalRepository';

@injectable()
class LoginUseCase {
  constructor(
    @inject(TYPES.LoginRepository)
    private mLoginRepository: LoginRepository,
    @inject(TYPES.LocalRepository)
    private mLocalRepository: LocalRepository,
  ) { }

  async login(
    email: string,
    password: string,
  ): Promise<User> {
    var emailUser = ""
    if (email && email.length > 0) {
      emailUser = email.toLocaleLowerCase()
    } else {
      emailUser = (await this.mLocalRepository.getUser()).email
    }
    const dto: LoginModel = {
      email: emailUser,
      password: password
    }
    return this.mLoginRepository
      .login(dto)
      .then(async (user: User) => {
        await this.mLocalRepository.saveUser(user)
        return Promise.resolve(user)
      })
  }

  // async resendSMS(user: User): Promise<ResponseAPI> {
  //   const smsModel: SMSValidationModel = {
  //     email: user.email,
  //     phone_number: user.phone,
  //   }
  //   return this.registerRepository
  //     .resendSMS(smsModel)
  // }

  // async resendEmail(user: User): Promise<ResponseAPI> {
  //   const emailModel: EmailValidationModel = {
  //     email: user.email,
  //   }
  //   return this.registerRepository
  //     .resendEmail(emailModel)
  // }
}

export default LoginUseCase;
