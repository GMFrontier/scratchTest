import { ResponseAPI } from "../../../../core/data/models/ResponseApi";
import { User } from "../../../../core/data/models/User";
import { RegistrationModel, RegistrationStep5Model } from "../../presentation/register/model/RegistrationModel";
import { EmailValidationModel, RegisterEmailValidationModel, RegisterSMSValidationModel, SMSValidationModel } from "../../presentation/register/model/SMSValidationModel";

export interface RegisterRepository {
  registerUser(
    registrationUser: RegistrationModel,
  ): Promise<User>;
  sendSMSCode(
    smsModel: RegisterSMSValidationModel,
  ): Promise<ResponseAPI>;
  sendEmailCode(
    smsModel: RegisterEmailValidationModel,
  ): Promise<User>;
  getSMSCode(
    smsModel: SMSValidationModel,
  ): Promise<ResponseAPI>;
  getEmailCode(
    emailModel: EmailValidationModel,
  ): Promise<ResponseAPI>;
  registerStep4(
    dto: any,
  ): Promise<ResponseAPI>;
  registerStep5(
    userId: string,
    dto: RegistrationStep5Model,
  ): Promise<ResponseAPI>;


}

export default RegisterRepository;
