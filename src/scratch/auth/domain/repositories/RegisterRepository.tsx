import { RegistrationModel } from "../../presentation/register/model/RegistrationModel";

export interface RegisterRepository {
  registerUser(
    registrationUser: RegistrationModel,
  ): Promise<User>;


}

export default RegisterRepository;
