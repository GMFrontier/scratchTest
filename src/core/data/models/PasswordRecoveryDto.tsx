export interface PasswordRecoveryStep1 {
  email: string;
}

export interface PasswordRecoveryStep2 {
  email: string;
  recovery_code: string;
}

export interface PasswordRecoveryStep3 {
  email: string;
  new_password: string;
}