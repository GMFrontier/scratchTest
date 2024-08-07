import { injectable } from 'inversify';
import PreferencesUseCase from '../../../domain/use_case/PreferencesUseCase';
import { HAS_BIOMETRIC_BEEN_SET } from '../../../data/models/UserCredentials';

@injectable()
export class BiometricViewModel {

  constructor(
    private mPreferencesUseCase: PreferencesUseCase,
  ) { }

  async hasBiometricBeenSet(): Promise<boolean> {
    const data = await this.mPreferencesUseCase.getPreference(HAS_BIOMETRIC_BEEN_SET)
    return JSON.parse(data) as boolean
  }

  async setBiometricAccount(): Promise<void> {
    await this.mPreferencesUseCase.save(HAS_BIOMETRIC_BEEN_SET, JSON.stringify(true))
  }
}

export default BiometricViewModel;
