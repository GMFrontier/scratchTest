import { inject, injectable } from 'inversify';
import LocalRepository from '../../../../core/domain/repository/LocalRepository';
import { TYPES } from '../../../di/types';
import { User } from '../../../../core/data/models/User';
import HomeRepository from '../../../auth/domain/repositories/HomeRepository';
import { Balance } from '../../../../core/data/models/Balance';
import { ResponseAPI } from '../../../../core/data/models/ResponseApi';

@injectable()
class PaymentMethodsUseCase {
  constructor(
    @inject(TYPES.LocalRepository)
    private localRepository: LocalRepository,
    @inject(TYPES.HomeRepository)
    private mHomeRepository: HomeRepository,
  ) { }

  async getBalance(): Promise<Balance> {
    const user = await this.localRepository.getUser();
    return this.mHomeRepository.getBalance(user.id)
  }

  async getPeriods(): Promise<Periods[]> {
    const user = await this.localRepository.getUser();
    return this.mHomeRepository.getPeriods(user.id)
  }

  async getMovements(): Promise<Movement[]> {
    return this.mHomeRepository.getMovements("")
  }

  async saveMovement(movement: Movement): Promise<ResponseAPI> {
    return this.mHomeRepository.saveMovement(movement)
  }
}

export default PaymentMethodsUseCase;
