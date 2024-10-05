import { injectable } from 'inversify';
import { observable, makeObservable, action, runInAction } from 'mobx'
import PreferencesUseCase from '../../../core/domain/use_case/PreferencesUseCase';
import { User } from '../../../core/data/models/User';
import { Balance } from '../../../core/data/models/Balance';
import PaymentMethodsUseCase from '../domain/use_case/PaymentMethodsUseCase';
import { ErrorAPI, ResponseAPI } from '../../../core/data/models/ResponseApi';


@injectable()
class HomeViewModel {

  @observable user: User;
  @observable userBalance: Balance = {
    currency: "",
    balance: 0,
    totalCredit: 0,
    spent: 0
  }
  @observable periods: Periods[] = []
  @observable movements: Movement[] = []
  @observable movement: Movement
  @observable successResponse: ResponseAPI
  @observable errorResponse: ErrorAPI


  constructor(
    private mPreferencesUseCase: PreferencesUseCase,
    private mPaymentMethodsUseCase: PaymentMethodsUseCase,
  ) {
    makeObservable(this)
  }

  @action
  saveCategory(category: string) {
    runInAction(() => {
      this.movement.category_id = category
    })
    this.saveMovement()
  }

  @action
  saveComment(comment: string) {
    runInAction(() => {
      this.movement.comment = comment
    })
    this.saveMovement()
  }

  @action
  saveMovement() {
    this.mPaymentMethodsUseCase
      .saveMovement(this.movement)
      .then((response) => {
        runInAction(() => {
          this.successResponse = response
        })
      })
      .catch((error) => {
        runInAction(() => {
          this.errorResponse = error
        })
      })
  }

  @action
  setMovement(movement: Movement) {
    runInAction(() => {
      this.movement = movement
    })
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

  @action
  getBalance() {
    this.mPaymentMethodsUseCase.getBalance()
      .then((balance: Balance) => {
        runInAction(() => {
          this.userBalance = balance
        })
      })
  }

  @action
  getPeriods() {
    this.mPaymentMethodsUseCase.getPeriods()
      .then((periods: Periods[]) => {
        runInAction(() => {
          this.periods = periods
        })
      })
  }

  @action
  getMovements() {
    this.mPaymentMethodsUseCase.getMovements()
      .then((movements: Movement[]) => {
        runInAction(() => {
          this.movements = movements
        })
      })
  }
}

export default HomeViewModel;
