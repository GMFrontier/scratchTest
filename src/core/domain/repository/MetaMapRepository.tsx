import { MetaMapDataDto, MetaMapDataResponseDto } from "../../../scratch/utils/MetaMapDataDto";

export interface MetaMapRepository {
  getMetaMapData(data: MetaMapDataDto): Promise<MetaMapDataResponseDto>;
}

export default MetaMapRepository;
