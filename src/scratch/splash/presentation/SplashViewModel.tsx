import { injectable } from 'inversify';
import { NativeModules } from 'react-native';
import Config from 'react-native-config';
import { observable, makeObservable, action, runInAction } from 'mobx';
import PreferencesUseCase from '../../../core/domain/use_case/PreferencesUseCase';
import { REMEMBER_USER } from '../../auth/presentation/login/LoginViewModel';

@injectable()
class SplashViewModel {
  private user: any;
  @observable public dataLoaded: any;
  @observable public requiredUpdate: any;

  constructor(
    private mPreferencesUseCase: PreferencesUseCase
  ) {
    makeObservable(this);
  }

}

export default SplashViewModel;
