import { injectable } from 'inversify';
import LocalRepository from '../../../domain/repository/LocalRepository';
import EncryptedStorage from 'react-native-encrypted-storage';
import { UserCredentials } from '../../models/UserCredentials';
import { LocalStorage } from './LocalStorage';
import { User } from '../../models/User';

const USER_CREDENTIALS = "USER_CREDENTIALS"

@injectable()
class LocalRepositoryImpl implements LocalRepository {
  saveUserCredentials(userCredentials: UserCredentials): Promise<void> {
    return EncryptedStorage.setItem(
      USER_CREDENTIALS,
      JSON.stringify(userCredentials)
    );
  }

  async getUserCredentials(): Promise<UserCredentials | undefined> {
    const data = await EncryptedStorage.getItem(USER_CREDENTIALS);
    if (data) {
      const userCredentials: UserCredentials = JSON.parse(data as any)
      return userCredentials
    }
    return
  }

  async getPreferences(key: string): Promise<string> {
    const { getItem } = LocalStorage();
    const data = await getItem(key);
    return data as string;
  }

  async savePreferences(key: string, data: string): Promise<void> {
    const { save } = LocalStorage();
    await save(key, data);
  }

  async saveUser(user: User): Promise<void> {
    const { save } = LocalStorage();
    await save('user', JSON.stringify(user));
  }

  async getUser(): Promise<User> {
    const { getItem } = LocalStorage();
    const data = await getItem('user');
    const user: User = JSON.parse(data as any);
    return user;
  }
}

export default LocalRepositoryImpl;
