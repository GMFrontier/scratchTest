
import { injectable } from 'inversify';
import { observable, makeObservable, action, runInAction } from 'mobx';
import { UserVerifiedStatus } from '../../core/data/models/User';
import RegistrationUseCase from '../auth/domain/use_case/RegistrationUseCase';
import LoginUseCase from '../auth/domain/use_case/LoginUseCase';
import { MetaMapDataResponseDto } from './MetaMapDataDto';
import PreferencesUseCase from '../../core/domain/use_case/PreferencesUseCase';
import { ErrorAPI } from '../../core/data/models/ResponseApi';
import { postEvent } from '../../core/presentation/utils/MobxUtils';
import GetUserVerifiedUseCase from '../../core/domain/use_case/GetUserVerifiedUseCase';
import GetMetaMapDataUsecase from '../../core/domain/use_case/GetMetaMapDataUsecase';

@injectable()
class MetaMapViewModel {

  public metaMapData: MetaMapDataResponseDto;

  //user verification status
  @observable public statusResponse1: { userVerifiedStatus: UserVerifiedStatus, event: any };
  @observable public statusResponse2: { userVerifiedStatus: UserVerifiedStatus, event: any };

  constructor(
    private mGetMetaMapDataUsecase: GetMetaMapDataUsecase,
    private mGetUserVerifiedUseCase: GetUserVerifiedUseCase,
    private mRegistrationUseCase: RegistrationUseCase,
    private mLoginUseCase: LoginUseCase,
    private mPreferencesUseCase: PreferencesUseCase
  ) {
    makeObservable(this);
  }

  public getMetaMapData = async (
    callback: (idUsr: string) => void = () => { },
  ) => {
    const idUsr = (await this.mPreferencesUseCase.getUser()).id.toString()
    this.mGetMetaMapDataUsecase
      .getMetaMapData(idUsr)
      .then((response: MetaMapDataResponseDto) => {
        this.metaMapData = response;
        callback(idUsr);
      })
      .catch((error: ErrorAPI) => {
        // this.showInfoToast(error.message);
      });
  };

  public getClientId() {
    return this.metaMapData.data?.clientId;
  }

  public getFlowId() {
    return this.metaMapData.data?.flowId;
  }

  public getSDKMetadata() {
    let metadata = this.metaMapData.data.metadata
    return metadata;
  }

  @action public checkVerifiedStatus() {
    this.mGetUserVerifiedUseCase.getUserVerifiedStatus()
      .then((verifiedStatus: UserVerifiedStatus) => {
        runInAction(() => {
          this.statusResponse1 = { userVerifiedStatus: verifiedStatus, event: postEvent() }
        })
      })
  }

  @action public checkVerifiedStatus2() {
    this.mGetUserVerifiedUseCase.getUserVerifiedStatus()
      .then((verifiedStatus: UserVerifiedStatus) => {
        runInAction(() => {
          this.statusResponse2 = { userVerifiedStatus: verifiedStatus, event: postEvent() }
        })
      })
  }
}

export default MetaMapViewModel;
