import { inject, injectable } from 'inversify';
import LocalRepository from '../repository/LocalRepository';
import { TYPES } from '../../../scratch/di/types';

@injectable()
class PreferencesUseCase {
  constructor(
    @inject(TYPES.LocalRepository)
    private localRepository: LocalRepository,
  ) { }

  async save(data: string, key: string): Promise<void> {
    return this.localRepository.savePreferences(data, key);
  }

  getPreference(key: string): Promise<string> {
    return this.localRepository.getPreferences(key);
  }
}

export default PreferencesUseCase;
