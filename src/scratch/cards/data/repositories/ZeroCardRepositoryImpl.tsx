import { injectable } from 'inversify';
import ApiService from '../../../../core/data/sources/remote/ApiService';
import { ResponseAPI } from '../../../../core/data/models/ResponseApi';
import EndPoints from '../../../../core/constants/EndPoints';
import { api } from '../../../../core/data/sources/remote/Api';
import ZeroCardRepository from '../../domain/repositories/ZeroCardRepository';
import { ZeroCard } from '../../presentation/models/ZeroCard';
import { CardOrderModel } from '../../presentation/models/Request';

@injectable()
class ZeroCardRepositoryImpl implements ZeroCardRepository {
  activateCard(data: any): Promise<ResponseAPI> {
    return new Promise<ResponseAPI>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.post<ResponseAPI>(
          EndPoints.CARD_ACTIONS,
          { action: "ackReception", userId: data.userId, pan: data.pan, cvv: data.cvv }
        )
      })
        .then((result: ResponseAPI) => {
          resolve(result)
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  unblockCard(): Promise<ResponseAPI> {
    return new Promise<ResponseAPI>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.post<ResponseAPI>(
          EndPoints.CARD_ACTIONS,
          { action: "unblockCard", }
        )
      })
        .then((result: ResponseAPI) => {
          resolve(result)
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  blockCard(): Promise<ResponseAPI> {
    return new Promise<ResponseAPI>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.post<ResponseAPI>(
          EndPoints.CARD_ACTIONS,
          { action: "blockCard", }
        )
      })
        .then((result: ResponseAPI) => {
          resolve(result)
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  changeCardPin(pin: string): Promise<ResponseAPI> {
    return new Promise<ResponseAPI>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.post<ResponseAPI>(
          EndPoints.CARD_ACTIONS,
          { action: "changePin", pin: pin }
        )
      })
        .then((result: ResponseAPI) => {
          resolve(result)
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  getCardPin(): Promise<ResponseAPI> {
    return new Promise<ResponseAPI>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.post<ResponseAPI>(
          EndPoints.CARD_ACTIONS,
          { action: "checkPin" }
        )
      })
        .then((result: ResponseAPI) => {
          resolve(result)
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  getCardCvv(): Promise<ResponseAPI> {
    return new Promise<ResponseAPI>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.post<ResponseAPI>(
          EndPoints.CARD_ACTIONS,
          { action: "checkCvv" }
        )
      })
        .then((result: ResponseAPI) => {
          resolve(result)
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  getCardPan(): Promise<ResponseAPI> {
    return new Promise<ResponseAPI>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.post<ResponseAPI>(
          EndPoints.CARD_ACTIONS,
          { action: "checkPan" }
        )
      })
        .then((result: ResponseAPI) => {
          resolve(result)
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  createCreditCard(userId: string): Promise<ResponseAPI> {
    const data = {
      userId: userId,
      isPhysical: true
    }
    return new Promise<ResponseAPI>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.post<ResponseAPI>(
          EndPoints.CREATE_CREDIT_CARD,
          data
        )
      })
        .then((result: ResponseAPI) => {
          resolve(result)
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  sendDeliveryData(data: any, userId: string): Promise<ResponseAPI> {
    return new Promise<ResponseAPI>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.put<ResponseAPI>(
          EndPoints.CARD_ADDRESS + "/" + userId,
          data
        )
      })
        .then((result: ResponseAPI) => {
          return this.createCreditCard(result.data.user_id)
            .then((data) => {
              resolve(data)
            })
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  getCardOrder(data: any): Promise<CardOrderModel> {
    return new Promise<CardOrderModel>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.get<ResponseAPI>(
          EndPoints.CARD_ADDRESS + "?user_id=" + data,
          data
        )
      })
        .then((result: ResponseAPI) => {
          if (result.data[0]) {
            resolve(result.data[0]);
          } else reject()
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  sendRequestPayment(data: any): Promise<ResponseAPI> {
    return new Promise<ResponseAPI>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.post<ResponseAPI>(
          EndPoints.ZERO_REQUEST_PAYMENT,
          data
        )
      })
        .then((result: ResponseAPI) => {
          resolve(data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getZeroCards(data: any): Promise<ZeroCard> {

    return new Promise<ZeroCard>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.get<ResponseAPI>(
          EndPoints.ZERO_CARDS + "?user_id=" + data,
        )
      })
        .then((result: ResponseAPI) => {

          const data = result.data[0] as ZeroCard
          if (data) {
            resolve(data);
          }
          else reject()
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}

export default ZeroCardRepositoryImpl;
