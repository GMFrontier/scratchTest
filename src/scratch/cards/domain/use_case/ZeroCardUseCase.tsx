import { inject, injectable } from 'inversify';
import LocalRepository from '../../../../core/domain/repository/LocalRepository';
import { TYPES } from '../../../di/types';
import { User } from '../../../../core/data/models/User';
import HomeRepository from '../../../auth/domain/repositories/HomeRepository';
import { Balance } from '../../../../core/data/models/Balance';
import { ResponseAPI } from '../../../../core/data/models/ResponseApi';
import ZeroCardRepository from '../repositories/ZeroCardRepository';
import { ZeroCard, ZeroCardDetails } from '../../presentation/models/ZeroCard';
import { CardOrderModel, Delivery, RequestPayment } from '../../presentation/models/Request';

@injectable()
class ZeroCardUseCase {
  constructor(
    @inject(TYPES.LocalRepository)
    private localRepository: LocalRepository,
    @inject(TYPES.ZeroCardRepository)
    private mZeroCardRepository: ZeroCardRepository,
  ) { }

  async activateCard(pan: string, cvv: string): Promise<ResponseAPI> {
    const user = await this.localRepository.getUser();
    const data = {
      userId: user.id,
      pan: pan,
      cvv: cvv
    }
    return this.mZeroCardRepository.activateCard(data)
  }

  async unblockCard(): Promise<ResponseAPI> {
    return this.mZeroCardRepository.unblockCard()
  }

  async blockCard(): Promise<ResponseAPI> {
    return this.mZeroCardRepository.blockCard()
  }

  async changeCardPin(pin: string): Promise<ResponseAPI> {
    return this.mZeroCardRepository.changeCardPin(pin)
  }

  async getCardPin(): Promise<ResponseAPI> {
    return this.mZeroCardRepository.getCardPin()
  }

  async getCardDetails(card: ZeroCard): Promise<ZeroCardDetails> {
    const pan = (await this.mZeroCardRepository.getCardPan()).data
    const cvv = (await this.mZeroCardRepository.getCardCvv()).data

    const data: ZeroCardDetails = {
      cardId: pan.response.cardId,
      pan: pan.response.pan,
      expDate: pan.response.expDate,
      cvv: cvv.response.cvv,
      cardOwner: card.name,
      address: card.address
    }
    return data
  }

  async getCardOrder(): Promise<CardOrderModel> {
    const user = await this.localRepository.getUser();
    return this.mZeroCardRepository.getCardOrder(user.id)
  }

  async sendDeliveryData(data: Delivery, id: string): Promise<ResponseAPI> {
    return this.mZeroCardRepository.sendDeliveryData(data, id)
  }

  async sendRequestPayment(data: RequestPayment): Promise<ResponseAPI> {
    const user = await this.localRepository.getUser();
    data.userId = user.id
    return this.mZeroCardRepository.sendRequestPayment(data)
  }

  async getZeroCards(): Promise<ZeroCard> {
    const user = await this.localRepository.getUser();

    return this.mZeroCardRepository.getZeroCards(user.id)
      .then((data) => {
        if (data.is_active) {
          data.zeroStatus = "ACTIVATED"
          return data
        }
        if (!data.is_active) {
          data.zeroStatus = "BLOCKED"
          return data
        }
        if (data.status = "pendingAck") {
          data.zeroStatus = "ACTIVATE"
          return data
        }

        data.zeroStatus = "ERROR"
        return data

      })
      .catch((error) => {
        console.log("ERRORR")
        console.log("ERRORR")
        console.log("ERRORR")
        console.log("ERRORR")
        console.log("ERRORR")
        console.log(JSON.stringify(error))
        if (user.isCardOrderInit && !user.payOrderComplete) {
          console.log("user.isCardOrderInit")
          console.log("user.isCardOrderInit")
          let zero: ZeroCard = {
            collection_name: "",
            _id: "",
            user_id: "",
            user_id_paycaddy: "",
            wallet_id: "",
            card_id_paycaddy: "",
            exp_year: null,
            exp_month: null,
            code: "",
            brand: null,
            is_physical: true,
            is_active: true,
            create_date: "",
            lastUsed: "",
            status: "",
            due_date: 0,
            name: null,
            address: "",
            zeroStatus: "DELIVERY",
          }
          return Promise.resolve(zero)
        }
        return error
      })
  }
}

export default ZeroCardUseCase;
