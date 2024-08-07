import { inject, injectable } from 'inversify';
import { TYPES } from '../../../di/types';
import { User } from '../../../../core/data/models/User';
import { AddressRegisterModel, FinancialRegisterModel, RegistrationModel, RegistrationStep5Model } from '../../presentation/register/model/RegistrationModel';
import RegisterRepository from '../repositories/RegisterRepository';
import { EmailValidationModel, RegisterEmailValidationModel, RegisterSMSValidationModel, SMSValidationModel } from '../../presentation/register/model/SMSValidationModel';
import { ResponseAPI } from '../../../../core/data/models/ResponseApi';
import { DEFAULT_COUNTRY } from '../../presentation/register/RegisterViewModel';

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
      email: email.toLocaleLowerCase(),
      password: password,
      phone_number: phone,
      livePanama: true,
      birthDate: birthDate,
      nationality: nationality,
    }
    return this.registerRepository
      .registerUser(registrationModel)
  }

  async getEmailCode(user: User): Promise<ResponseAPI> {
    const dto: EmailValidationModel = {
      email: user.email,
    }
    return this.registerRepository
      .getEmailCode(dto)
  }

  async sendSMSCode(user: User, code: string): Promise<ResponseAPI> {
    const dto: RegisterSMSValidationModel = {
      email: user.email,
      phone_number: user.phoneNumber,
      sms_code: code,
      step: 2,
    }
    return this.registerRepository
      .sendSMSCode(dto)
  }

  async sendEmailCode(user: User, code: string): Promise<User> {
    const dto: RegisterEmailValidationModel = {
      email: user.email,
      email_code: code,
      step: 3
    }
    return this.registerRepository
      .sendEmailCode(dto)
  }

  async getSMSCode(user: User): Promise<ResponseAPI> {
    const smsModel: SMSValidationModel = {
      email: user.email,
      phone_number: user.phoneNumber,
    }
    return this.registerRepository
      .getSMSCode(smsModel)
  }

  async registerStep4(
    user: User,
    address: AddressRegisterModel,
    financial: FinancialRegisterModel,
  ): Promise<ResponseAPI> {
    address.country = DEFAULT_COUNTRY
    const dto = {
      step: 4,
      id: user.id,
      email: user.email,
      address: address,
      ...financial,
    }
    return this.registerRepository
      .registerStep4(dto)
  }

  async registerStep5(
    user: User,
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
  ): Promise<ResponseAPI> {
    const dto: RegistrationStep5Model = {
      type_of_work: jobStatus,
      position: jobPosition,
      place_of_work: workplace,
      name_of_company: company,
      company_age: companyAge,
      social_networks: socialMedia,
      website,
      seniority: jobExperience,
      social_security: seguro,
      movements,
      operation_notice: operacion,
      tax_return: renta,
    }

    return this.registerRepository
      .registerStep5(user.financialInfoId, dto)
  }
}

export default RegistrationUseCase;
