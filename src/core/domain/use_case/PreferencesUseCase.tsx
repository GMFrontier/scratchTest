import { inject, injectable } from 'inversify';
import LocalRepository from '../repository/LocalRepository';
import { TYPES } from '../../../scratch/di/types';
import { User } from '../../data/models/User';

@injectable()
class PreferencesUseCase {
  constructor(
    @inject(TYPES.LocalRepository)
    private localRepository: LocalRepository,
  ) { }

  async save(key: string, data: string): Promise<void> {
    return this.localRepository.savePreferences(key, data);
  }

  getPreference(key: string): Promise<string> {
    return this.localRepository.getPreferences(key);
  }

  getUser(): Promise<User> {
    return this.localRepository.getUser();
  }
}

export default PreferencesUseCase;
