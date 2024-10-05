import { Balance } from "../../../../core/data/models/Balance";
import { ResponseAPI } from "../../../../core/data/models/ResponseApi";

export interface HomeRepository {
  getBalance(data: any,): Promise<Balance>;
  getPeriods(data: any,): Promise<Periods[]>;
  getMovements(data: any,): Promise<Movement[]>;
  saveMovement(movement: Movement): Promise<ResponseAPI>;
}

export default HomeRepository;
