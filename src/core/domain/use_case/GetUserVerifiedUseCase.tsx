import { inject, injectable } from 'inversify';
import { TYPES } from '../../../scratch/di/types';
import LocalRepository from '../repository/LocalRepository';
import LoginRepository from '../../../scratch/auth/domain/repositories/LoginRepository';
import { UserVerifiedStatus } from '../../data/models/User';
@injectable()
class GetUserVerifiedUseCase {
  constructor(
    @inject(TYPES.LocalRepository)
    private localRepository: LocalRepository,
    @inject(TYPES.LoginRepository)
    private loginRepository: LoginRepository,
  ) { }

  async getUserVerifiedStatus(): Promise<UserVerifiedStatus> {
    const user = await this.localRepository.getUser()
    if (user.verifiedStatus == "VALIDATED") {
      return UserVerifiedStatus.VALIDATED
    }
    const refreshLogin = await this.loginRepository.refreshLogin(user.token)
    const verifiedStatus = refreshLogin.verifiedStatus
    user.verifiedStatus = verifiedStatus

    this.localRepository.saveUser(user)

    if (user.verifiedStatus == "PENDING") {
      return UserVerifiedStatus.PENDING
    }

    if (user.verifiedStatus == "VALIDATED") {
      return UserVerifiedStatus.VALIDATED
    }
    if (user.verifiedStatus == "IN_PROGRESS") {
      return UserVerifiedStatus.IN_PROGRESS
    }
    return UserVerifiedStatus.NOT_VERIFIED
  }
}

export default GetUserVerifiedUseCase;
