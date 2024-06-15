import { LoginModel } from "../../presentation/login/model/LoginModel";

export interface LoginRepository {
  login(loginModel: LoginModel): Promise<LoggedUserDto>;
}

export default LoginRepository;
