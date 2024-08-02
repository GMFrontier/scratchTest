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
import { PasswordRecoveryStep2, PasswordRecoveryStep3 } from '../../../../core/data/models/PasswordRecoveryDto';
import { setAuthorizationToken } from '../../../../core/data/sources/remote/Api';

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
        setAuthorizationToken(user.token)
        return Promise.resolve(user)
      })
  }

  async sendRecoveryEmail(email: string): Promise<ResponseAPI> {
    const emailModel: EmailValidationModel = {
      email: email,
    }
    return this.mLoginRepository
      .sendRecoveryEmail(emailModel)
  }

  async sendEmailCode(email: string, code: string): Promise<ResponseAPI> {
    const dto: PasswordRecoveryStep2 = {
      email: email,
      recovery_code: code
    }
    return this.mLoginRepository
      .sendRecoveryCode(dto)
  }

  async sendNewPassword(email: string, new_password: string): Promise<ResponseAPI> {
    const dto: PasswordRecoveryStep3 = {
      email: email,
      new_password: new_password
    }
    return this.mLoginRepository
      .sendNewPassword(dto)
  }
}

export default LoginUseCase;
