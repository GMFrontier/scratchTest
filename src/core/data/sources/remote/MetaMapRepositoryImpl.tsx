import { injectable } from 'inversify';
import MetaMapRepository from '../../../domain/repository/MetaMapRepository';
import { MetaMapDataDto, MetaMapDataResponseDto } from '../../../../scratch/utils/MetaMapDataDto';
import ApiService from './ApiService';
import { ResponseAPI } from '../../models/ResponseApi';
import EndPoints from '../../../constants/EndPoints';
import { api } from './Api';

@injectable()
class MetaMapRepositoryImpl implements MetaMapRepository {
  getMetaMapData(data: MetaMapDataDto): Promise<MetaMapDataResponseDto> {
    return new Promise<MetaMapDataResponseDto>((resolve, reject) => {
      ApiService.apiCallWithLoading(() => {
        return api.post<ResponseAPI>(
          EndPoints.REQUEST_KYC_VALIDATION,
          data,
        );
      })
        .then((result: ResponseAPI) => {
          resolve(result.data as MetaMapDataResponseDto);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}

export default MetaMapRepositoryImpl;
