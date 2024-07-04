import { User } from "../../../../core/data/models/User";
import { LoginModel } from "../../presentation/login/model/LoginModel";

export interface LoginRepository {
  login(loginModel: LoginModel): Promise<User>;
}

export default LoginRepository;
