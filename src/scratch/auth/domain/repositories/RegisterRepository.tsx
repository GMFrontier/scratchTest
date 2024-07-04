import { ResponseAPI } from "../../../../core/data/models/ResponseApi";
import { User } from "../../../../core/data/models/User";
import { RegistrationModel } from "../../presentation/register/model/RegistrationModel";
import { EmailValidationModel, SMSValidationModel } from "../../presentation/register/model/SMSValidationModel";

export interface RegisterRepository {
  registerUser(
    registrationUser: RegistrationModel,
  ): Promise<User>;
  resendSMS(
    smsModel: SMSValidationModel,
  ): Promise<ResponseAPI>;
  resendEmail(
    emailModel: EmailValidationModel,
  ): Promise<ResponseAPI>;


}

export default RegisterRepository;
