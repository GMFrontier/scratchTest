import { User } from "../../data/models/User";
import { UserCredentials } from "../../data/models/UserCredentials";


export interface LocalRepository {

  saveUser(user: User): Promise<void>;
  getUser(): Promise<User>;

  savePreferences(key: string, data: string): Promise<void>;
  getPreferences(key: string): Promise<string>;

  saveUserCredentials(userCredentials: UserCredentials): Promise<void>
  getUserCredentials(): Promise<UserCredentials | undefined>

}

export default LocalRepository;
