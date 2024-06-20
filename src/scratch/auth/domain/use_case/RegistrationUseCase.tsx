import { inject, injectable } from 'inversify';
import { TYPES } from '../../../di/types';
import { User } from '../../../../core/data/models/User';
import { RegistrationModel } from '../../presentation/register/model/RegistrationModel';
import RegisterRepository from '../repositories/RegisterRepository';

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
      firstName: name,
      lastName: lastname,
      email: email,
      password: password,
      phone_number: phone,
      livePanama: true,
      birthDate: birthDate,
      nationality: nationality,
      document: 41684688
    }
    return this.registerRepository
      .registerUser(registrationModel)
  }
}

export default RegistrationUseCase;
