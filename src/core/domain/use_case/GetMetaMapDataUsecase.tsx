import { inject, injectable } from 'inversify';
import { TYPES } from '../../../scratch/di/types';
import { MetaMapDataDto, MetaMapDataResponseDto } from '../../../scratch/utils/MetaMapDataDto';
import MetaMapRepository from '../repository/MetaMapRepository';

@injectable()
class GetMetaMapDataUsecase {
  constructor(
    @inject(TYPES.MetaMapRepository)
    private mRegisterRepository: MetaMapRepository,
  ) { }

  getMetaMapData(idUsr: string): Promise<MetaMapDataResponseDto> {
    const mMetaMapDataDto: MetaMapDataDto = {
      idUsr,
      validationType: 'WALLET',
    };
    return this.mRegisterRepository.getMetaMapData(mMetaMapDataDto);
  }
}

export default GetMetaMapDataUsecase;
