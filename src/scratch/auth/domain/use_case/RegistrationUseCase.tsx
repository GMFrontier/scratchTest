import { inject, injectable } from 'inversify';
import { TYPES } from '../../../di/types';
import { User } from '../../../../core/data/models/User';
import { RegistrationModel } from '../../presentation/register/model/RegistrationModel';
import RegisterRepository from '../repositories/RegisterRepository';
import { EmailValidationModel, SMSValidationModel } from '../../presentation/register/model/SMSValidationModel';
import { ResponseAPI } from '../../../../core/data/models/ResponseApi';

@injectable()
class RegistrationUseCase {
  constructor(
    @inject(TYPES.RegisterRepository)
    private registerRepository: RegisterRepository,
  ) { }

  async registerUser(
    name: string,
    lastname: string,
    birthDate: string,
    nationality: string,
    email: string,
    phone: string,
    password: string
  ): Promise<User> {
    const registrationModel: RegistrationModel = {
      step: 1,
      name: name,
      lastName: lastname,
      email: email,
      password: password,
      phone_number: phone,
      livePanama: true,
      birthDate: birthDate,
      nationality: nationality,
    }
    return this.registerRepository
      .registerUser(registrationModel)
  }

  async resendSMS(user: User): Promise<ResponseAPI> {
    const smsModel: SMSValidationModel = {
      email: user.email,
      phone_number: user.phone,
    }
    return this.registerRepository
      .resendSMS(smsModel)
  }

  async resendEmail(user: User): Promise<ResponseAPI> {
    const emailModel: EmailValidationModel = {
      email: user.email,
    }
    return this.registerRepository
      .resendEmail(emailModel)
  }
}

export default RegistrationUseCase;
