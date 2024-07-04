export interface User {
  id: number
  name: string
  lastName: string
  email: string
  photo: string | null
  verifiedStatus: any
  nationality: string | null
  phoneNumber: string
  hasPfCardActivated: boolean
  token: string
  role: string
  phoneVerifiedDate?: any | undefined;
}

export enum UserVerifiedStatus {
  VALIDATED = 'VALIDATED',
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_VERIFIED = 'NOT_VERIFIED',
  PENDING = 'PENDING',
}