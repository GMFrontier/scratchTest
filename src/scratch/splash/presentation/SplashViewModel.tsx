import { injectable } from 'inversify';
import BaseViewModel from '../../../../../core/presentation/viewmodel/BaseViewModel';
import ManageTranslationsUseCase from '../../../../domain/use_cases/splash/ManageTranslationsUseCase';
import { ROUTES } from '../../../../../core/presentation/routes';
import { ErrorAPI } from '../../../../../core/data/models/ResponseApi';
import GetUserLocalUseCase from '../../../../domain/use_cases/GetUserLocalUseCase';
import { setBaseToken } from '../../../../../core/data/sources/remote/ApiPagueloFacil';
import { NativeModules } from 'react-native';
import Config from 'react-native-config';
import { observable, makeObservable, action, runInAction } from 'mobx';
import { postEvent } from '../../../utils/MobxUtils';

@injectable()
class SplashViewModel extends BaseViewModel {
  private user: any;
  @observable public dataLoaded: any;
  @observable public requiredUpdate: any;

  constructor(private manageTranslationsUseCase: ManageTranslationsUseCase,
    private mGetUserLocalUseCase: GetUserLocalUseCase) {
    super();
    makeObservable(this);
  }

  @action
  manageAppTranslations() {
    const { UtilsModule } = NativeModules;

    setBaseToken(UtilsModule.l(Config.FLAVOR))
    this.manageTranslationsUseCase
      .manageAppTranslations()
      .then(async (response: void) => {
        this.user = await this.mGetUserLocalUseCase.getUser();
        runInAction(() => {
          this.dataLoaded = postEvent()
        })
      })
      .catch((error: ErrorAPI) => {
        this.showInfoToast(error.message);
      });
  }

  getNextScreen(): string {
    if (this.user == null) {
      return ROUTES.Login.OnBoardingScreen.screen.name as never
    } else {
      return ROUTES.Login.LoginScreen.screen.name as never
    }
  }
}

export default SplashViewModel;
