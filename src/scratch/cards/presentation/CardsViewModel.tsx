import { injectable } from 'inversify';
import { observable, makeObservable, action, runInAction } from 'mobx'
import PreferencesUseCase from '../../../core/domain/use_case/PreferencesUseCase';
import { User } from '../../../core/data/models/User';
import { ZeroCard, ZeroCardDetails } from './models/ZeroCard';
import ZeroCardUseCase from '../domain/use_case/ZeroCardUseCase';
import { ErrorAPI, ResponseAPI } from '../../../core/data/models/ResponseApi';
import { CardOrderModel, Delivery, RequestPayment } from './models/Request';

@injectable()
class CardsViewModel {

  @observable activateCardResponse?: any;
  @observable unblockCardResponse?: any;
  @observable blockCardResponse?: any;
  @observable zeroChangePinResponse?: any;
  @observable zeroCardPinResponse2?: any;
  @observable zeroCardPinResponse?: any;
  @observable zeroCardDetailsResponse?: ZeroCardDetails;
  @observable sendDeliveryResponse?: ResponseAPI;
  @observable cardOrderResponse?: CardOrderModel;
  @observable requestPaymentResponse?: ResponseAPI;
  @observable requestPayment?: RequestPayment;
  @observable address: string = "";
  @observable card?: ZeroCard;
  @observable error?: ZeroCard;
  @observable errorResponse: ErrorAPI

  constructor(
    private mPreferencesUseCase: PreferencesUseCase,
    private mZeroCardUseCase: ZeroCardUseCase,
  ) {
    makeObservable(this)
  }

  @action
  activateCard(pan: string, cvv: string) {
    this.mZeroCardUseCase.activateCard(pan, cvv)
      .then((response) => {
        runInAction(() => {
          this.activateCardResponse = response
          this.card.zeroStatus === "ACTIVATED"
          this.card.is_active === true
        })
      })
      .catch(error => {
        runInAction(() => {
          this.errorResponse = error
        })
      })
  }


  @action
  blockCard() {
    if (this.card.zeroStatus === "ACTIVATED") {
      this.mZeroCardUseCase.blockCard()
        .then((response) => {
          runInAction(() => {
            this.card.zeroStatus === "BLOCKED"
            this.card.is_active === response.data.isActive
            this.blockCardResponse = response
          })
        })
        .catch(error => {
          runInAction(() => {
            this.errorResponse = error
          })
        })
    } else {
      this.mZeroCardUseCase.unblockCard()
        .then((response) => {
          runInAction(() => {
            this.card.zeroStatus === "ACTIVATED"
            this.card.is_active === response.data.isActive
            this.unblockCardResponse = response
          })
        })
        .catch(error => {
          runInAction(() => {
            this.errorResponse = error
          })
        })
    }
  }

  @action
  changeCardPin(pin: string) {
    this.mZeroCardUseCase.changeCardPin(pin)
      .then((response) => {
        runInAction(() => {
          this.zeroChangePinResponse = response.data.response
        })
      })
      .catch(error => {
        runInAction(() => {
          this.errorResponse = error
        })
      })
  }

  @action
  getCardPin2() {
    this.mZeroCardUseCase.getCardPin()
      .then((response) => {
        runInAction(() => {
          this.zeroCardPinResponse2 = response.data.response
        })
      })
      .catch(error => {
        runInAction(() => {
          this.errorResponse = error
        })
      })
  }

  @action
  getCardPin() {
    this.mZeroCardUseCase.getCardPin()
      .then((response) => {
        runInAction(() => {
          this.zeroCardPinResponse = response.data.response
        })
      })
      .catch(error => {
        runInAction(() => {
          this.errorResponse = error
        })
      })
  }

  @action
  getCardDetails() {
    this.mZeroCardUseCase.getCardDetails(this.card)
      .then((response) => {
        runInAction(() => {
          this.zeroCardDetailsResponse = response
        })
      })
  }

  @action
  getCardOrder() {
    this.mZeroCardUseCase.getCardOrder()
      .then((response) => {
        runInAction(() => {
          this.cardOrderResponse = response
        })
      })
  }

  @action
  sendDeliveryData(data: Delivery) {
    runInAction(() => {
      this.cardOrderResponse = { ...this.cardOrderResponse, ...data }
    })

    this.mZeroCardUseCase.sendDeliveryData(data, this.cardOrderResponse._id)
      .then((response) => {
        runInAction(() => {
          console.log("ASDASDASDASDASDASD")
          console.log("ASDASDASDASDASDASD")
          console.log("ASDASDASDASDASDASD")
          this.sendDeliveryResponse = response
        })
      })
      .catch((error) => {
        runInAction(() => {
          this.errorResponse = error
        })
      })
  }

  @action
  sendRequestPayment() {
    this.mZeroCardUseCase.sendRequestPayment(this.requestPayment)
      .then((response) => {
        runInAction(() => {
          this.requestPaymentResponse = response
        })
      })
      .catch((error) => {
        this.errorResponse = error
      })
  }

  @action
  setRequestPayment(data: RequestPayment) {
    runInAction(() => {
      this.requestPayment = data
    })
  }

  @action
  getZeroCards() {

    this.mZeroCardUseCase.getZeroCards()
      .then(card => {
        runInAction(() => {
          this.card = card
        })
      })
      .catch((error) => {
        runInAction(() => {
          this.errorResponse = error
        })
      })
  }

  @action
  setCard(card: ZeroCard) {
    runInAction(() => {
      this.card = card
    })
  }

  @action
  setAddress(data: string) {
    runInAction(() => {
      this.address = data
    })
  }
}

export default CardsViewModel;
