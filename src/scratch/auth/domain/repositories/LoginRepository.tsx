import { PasswordRecoveryStep2, PasswordRecoveryStep3 } from "../../../../core/data/models/PasswordRecoveryDto";
import { User } from "../../../../core/data/models/User";
import { LoginModel } from "../../presentation/login/model/LoginModel";
import { EmailValidationModel } from "../../presentation/register/model/SMSValidationModel";

export interface LoginRepository {
  login(loginModel: LoginModel): Promise<User>;
  sendRecoveryEmail(email: EmailValidationModel): Promise<any>;
  sendRecoveryCode(dto: PasswordRecoveryStep2): Promise<any>;
  sendNewPassword(dto: PasswordRecoveryStep3): Promise<any>;
  refreshLogin(data: string): Promise<any>;
}

export default LoginRepository;
