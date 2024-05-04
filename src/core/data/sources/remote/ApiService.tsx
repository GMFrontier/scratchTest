import { AxiosPromise } from 'axios';
import { ErrorAPI, ResponseAPI } from '../../models/ResponseApi';
import ResponseUtils from '../../utils/ResponseUtils';
import { ROUTES } from '../../../../scratch/presentation/navigation/routes';
import { useLoadingContext } from '../../../presentation/contexts/loading/useLoadingContext';
import NavigationService from '../../../../paguelo_facil/presentation/navigator/NavigatorService';
import { setAuthorizationTokenDefault } from './ApiPagueloFacil';

class ApiService {
  protected withLoadingState: (callback: () => Promise<any>) => Promise<any>;

  constructor() {
    this.withLoadingState = useLoadingContext().withLoadingState.bind(this);
  }

  async apiCall(axiosCall: () => AxiosPromise<ResponseAPI>): Promise<any> {
    try {
      return (await axiosCall()).data;
    } catch (error) {
      const responseError = error as ErrorAPI;
      throw ResponseUtils.handleBackendErrorResponses(responseError, () => {
        this.delay(1500).then(() => {
          setAuthorizationTokenDefault()
          NavigationService.navigate(ROUTES.Login.LoginScreen.screen as never);
        });
      });
    }
  }

  async apiCallWithLoading(axiosCall: () => AxiosPromise<any>): Promise<any> {
    return this.withLoadingState(() => this.apiCall(axiosCall));
  }

  private delay(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
}

export default new ApiService();
