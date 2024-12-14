export default class EndPoints {
  static LOGIN = '/auth/login';
  static RECOVER_PASSWORD = '/api/request_password_recovery';
  static VERIFY_RECOVERY_CODE = '/api/verify_recovery_code';
  static SET_NEW_PASSWORD = '/api/set_new_password';
  static REFRESH_LOGIN = '/auth/token';
  static REGISTER = '/api/registerUser';
  static REGISTER_STEP_5 = '/api/financialInfo/';
  static RESEND_SMS = '/resendSms';
  static RESEND_EMAIL = '/resendEmailCode';
  static BALANCE = '/api/users/balance/';
  static PERIODS = 'api/periods/user/';
  static MOVEMENTS = '/api/transactions';
  static ZERO_CARDS = '/api/cardsZc';
  static ZERO_REQUEST_PAYMENT = '/api/pay/ach';
  static CARD_ADDRESS = '/api/cardOrder';
  static CREATE_CREDIT_CARD = '/api/createCreditCard'
  static CARD_ACTIONS = '/api/cardActions'
  static REQUEST_KYC_VALIDATION = '/RequestKycUser'
}


