export interface User {
  idUsr: number
  name: string
  lastname: string
  login: string
  email: string
  photo: string | null
  imageId: string | null
  verifiedStatus: any
  nationality: string | null
  phone: string
  idMerchant: number
  hasPfCardActivated: boolean
  token: string
  phoneVerifiedDate?: any | undefined;
}

export enum UserVerifiedStatus {
  VALIDATED = 'VALIDATED',
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_VERIFIED = 'NOT_VERIFIED',
  PENDING = 'PENDING',
}