export interface RegistrationModel {
  step: 1,
  name: string,
  lastName: string,
  email: string,
  password: string,
  phone_number: string,
  livePanama: boolean,
  birthDate: string,
  nationality: string,
}

export interface RegistrationStep5Model {
  step: 5,
  jobPosition?: string,
  workplace?: string,
  company?: string,
  companyAge?: string,
  socialMedia?: string,
  website?: string,
  jobExperience?: string,
  seguro?: string,
  movements?: string,
  operacion?: string,
  renta?: string,
}

export interface AddressRegisterModel {
  region: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  country?: string;
}

export interface FinancialRegisterModel {
  type_OfWork: string;
  placeOfWork: string;
  occupation: string;
  salary: string;
  pep: boolean;
  apc: boolean;
  toVerify: boolean;
  pdfDocument: string;
}