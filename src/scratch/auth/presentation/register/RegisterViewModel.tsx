import { injectable } from 'inversify';
import { Dispatch, SetStateAction } from 'react';
import { observable, makeObservable, action, runInAction } from 'mobx'

@injectable()
class RegisterViewModel {

  public phoneVerificationSuccess = false;
  public idUsr: any = "";
  @observable emailEditable = false

  constructor(

  ) {
    makeObservable(this)
  }


}

export default RegisterViewModel;
