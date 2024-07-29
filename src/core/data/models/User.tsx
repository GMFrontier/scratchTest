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
  address: Address
  pep: boolean
  isActive: boolean
  walletId: string
  kycUrl: string
  creationDate: string
}
export interface Address {
  addressLine1: string,
  addressLine2: string,
  homeNumber: string,
  city: string,
  region: string,
  postalCode: string,
  country: string,
}

export enum UserVerifiedStatus {
  VALIDATED = 'VALIDATED',
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_VERIFIED = 'NOT_VERIFIED',
  PENDING = 'PENDING',
}