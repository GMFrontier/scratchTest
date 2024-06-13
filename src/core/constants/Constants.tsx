export default class Constants {
  //APP AXIOS
  static API_BASE_URL = 'https://api.example.com';
  static MAX_RESULTS = 50;
  static DEFAULT_TIMEOUT = 10000;
  static INPUT_MAX_TEXT = 150;

  //SYSTEM CONFIG
  static SYSTEM_CONFIG = {
    APP: 'APP',
    SYSTEM_CONFIG_ASANA: 'ASANA',
    SYSTEM_CONFIG_USER_WALLET: 'USER.WALLET',
    SYSTEM_CONFIG_USER_GOOGLE: 'GOOGLE',
  };

  static SETTINGS_OPTIONS = {
    PROFILE: 'PROFILE',
    IDENTIFICATION: 'IDENTIFICATION',
    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
    PRIVACY_POLICY: 'PRIVACY_POLICY',
    TERMS_AND_CONDITIONS: 'TERMS_AND_CONDITIONS'
  };

  static TYPE_TRANSACTION = {
    CHARGE: 'CHARGE',

  };

  static CATEGORY_TRANSACTION = {
    USER: 'USER',
  };

  //VALUES

  static PAY_SERVICES_MIN_AMOUNT = 1;
  static MIN_BANK_TRANSFER_AMOUNT = 5

  static ACTIVITY_BUY = "PC";
  static ACTIVITY_PF = "SF";
}