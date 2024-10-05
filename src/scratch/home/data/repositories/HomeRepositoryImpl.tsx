import { injectable } from 'inversify';
import ApiService from '../../../../core/data/sources/remote/ApiService';
import { ResponseAPI } from '../../../../core/data/models/ResponseApi';
import EndPoints from '../../../../core/constants/EndPoints';
import { api } from '../../../../core/data/sources/remote/Api';
import HomeRepository from '../../../auth/domain/repositories/HomeRepository';
import { Balance } from '../../../../core/data/models/Balance';

@injectable()
class HomeRepositoryImpl implements HomeRepository {
  saveMovement(movement: Movement): Promise<ResponseAPI> {
    return new Promise<ResponseAPI>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        const data = { ...movement, categoryId: movement.category_id ?? "66f209274e9fb3982b9c5c1b" }
        return api.put<ResponseAPI>(
          EndPoints.MOVEMENTS + "/" + movement._id,
          data
        )
      })
        .then((result: ResponseAPI) => {
          resolve(result.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  getBalance(data: any): Promise<Balance> {
    return new Promise<Balance>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.get<ResponseAPI>(
          EndPoints.BALANCE + data,
        )
      })
        .then((result: ResponseAPI) => {
          const balance: Balance = {
            currency: result.data.currency ?? "none",
            balance: parseFloat(result.data.balance ?? "0"),
            totalCredit: parseFloat(result.data.totalCredit ?? "0"),
            spent: parseFloat(result.data.spent ?? "0"),
            dateEndPeriod: result.data.dateEndPeriod
          }
          resolve(balance);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  getPeriods(data: any): Promise<Periods[]> {
    return new Promise<Periods[]>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.get<ResponseAPI>(
          EndPoints.PERIODS + data,
        )
      })
        .then((result: ResponseAPI) => {
          resolve(result.data as Periods[]);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
  getMovements(data: any): Promise<Movement[]> {
    return new Promise<Movement[]>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.get<ResponseAPI>(
          EndPoints.MOVEMENTS + data,
        )
      })
        .then((result: ResponseAPI) => {
          let list = result.data as Movement[]
          list = list.sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          })
          resolve(list);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}

export default HomeRepositoryImpl;
