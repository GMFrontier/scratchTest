import { injectable } from 'inversify';
import { useToastContext } from '../contexts/messages/useToastContext';
import { setAuthorizationTokenDefault } from '../../data/sources/remote/ApiPagueloFacil';
import NavigationService from '../../../paguelo_facil/presentation/navigator/NavigatorService';
import { ROUTES } from '../../../scratch/presentation/navigation/routes';
import { ToastStyleType } from '../contexts/messages/ToastContext';

@injectable()
export class BaseViewModel {
  private useToast = useToastContext()

  public async showInfoToast(message: string) {
    this.useToast.showInfoToast(message)
  }

  public async showAlertToast(message: string) {
    this.useToast.showAlertToast(message)
  }

  public async showMessageToast(message: string) {
    this.useToast.showMessageToast(message)
  }

  public async showCustomToast(message: string, type?: ToastStyleType) {
    this.useToast.showCustomToastComponent(message, type)
  }


}

export default BaseViewModel;
