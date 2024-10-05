export interface User {
  id: string
  name: string
  lastName: string
  email: string
  photo: string | null
  verifiedStatus: any
  nationality: string | null
  phoneNumber: string
  token: string
  role: string
  phoneVerifiedDate?: any | undefined;
  address: Address
  pep: boolean
  isActive: boolean
  isVerifyPhone: boolean
  isVerifyEmail: boolean
  isCreateWallet: boolean
  isCompleteFinancialInfo: boolean
  walletId: string
  kycUrl: string
  creationDate: string
  password?: string
  kycStatus?: "not_register" | "verified"
  financialInfoId?: string
  isApproveCredit?: boolean
  isCardOrderInit?: boolean
  payOrderComplete?: boolean
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