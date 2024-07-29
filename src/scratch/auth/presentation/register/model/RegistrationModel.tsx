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
}

export interface FinancialRegisterModel {
  jobStatus: string;
  jobPlace: string;
  salary: string;
  exposedPerson: boolean;
  comprobante: string;
  apc: boolean;
  canVerify: boolean;
  pdfDocument: string;
}