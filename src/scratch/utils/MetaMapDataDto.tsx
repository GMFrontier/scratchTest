export interface MetaMapDataDto {
  [key: string]: any;
}

export interface MetaMapDataResponseDto {
  data: MetaDataDto
  integration: string
  url: string
}

export interface MetaDataDto {
  clientId: string
  flowId: string
  metadata: MetaMapDataDto
}