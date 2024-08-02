import { injectable } from 'inversify';
import { observable, makeObservable, action, runInAction } from 'mobx'
import PreferencesUseCase from '../../../core/domain/use_case/PreferencesUseCase';
import { User } from '../../../core/data/models/User';


@injectable()
class SettingsViewModel {

  @observable user: User;

  constructor(
    private mPreferencesUseCase: PreferencesUseCase,
  ) {
    makeObservable(this)
    this.getUser()
  }

  @action
  getUser() {
    this.mPreferencesUseCase.getUser()
      .then((user: User) => {
        runInAction(() => {
          this.user = user
        })
      })
  }
}

export default SettingsViewModel;
