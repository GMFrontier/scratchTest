export interface RegisterSMSValidationModel {
  step: 2,
  phone_number: string,
  sms_code: string,
  email: string,
}
export interface RegisterEmailValidationModel {
  step: 3,
  email_code: string,
  email: string,
}
export interface SMSValidationModel {
  email: string,
  phone_number: string,
}

export interface EmailValidationModel {
  email: string,
}

