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
  type_of_work?: string,
  position?: string,
  place_of_work?: string,
  name_of_company?: string,
  company_age?: string,
  social_networks?: string,
  website?: string,
  seniority?: number,
  social_security?: string,
  movements?: string,
  operation_notice?: string,
  tax_return?: string,
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
  placeOfWork: string;
  occupation: string;
  salary: string;
  pep: boolean;
  apc: boolean;
  toVerify: boolean;
  pdfDocument: string;
}