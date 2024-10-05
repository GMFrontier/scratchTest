import { Balance } from "../../../../core/data/models/Balance";
import { ResponseAPI } from "../../../../core/data/models/ResponseApi";
import { CardOrderModel } from "../../presentation/models/Request";
import { ZeroCard } from "../../presentation/models/ZeroCard";

export interface ZeroCardRepository {
  getZeroCards(data: any,): Promise<ZeroCard>;
  sendRequestPayment(data: any,): Promise<ResponseAPI>;
  sendDeliveryData(data: any, userId: string): Promise<ResponseAPI>;
  getCardOrder(data: any,): Promise<CardOrderModel>;
  getCardPan(): Promise<ResponseAPI>;
  getCardCvv(): Promise<ResponseAPI>;
  getCardPin(): Promise<ResponseAPI>;
  changeCardPin(pin: string): Promise<ResponseAPI>;
  blockCard(): Promise<ResponseAPI>;
  unblockCard(): Promise<ResponseAPI>;
  activateCard(data: any): Promise<ResponseAPI>;
}

export default ZeroCardRepository;
