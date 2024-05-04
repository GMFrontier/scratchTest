export default class EndPoints {
  static LOGIN = '/LoginApp';
  static REFRESH_LOGIN = '/RefreshUserLoginApp';
  static RECOVER_PASSWORD = '/RecoveryPassword';
  static REGISTER = '/RegisterUser';
  static ACTIVITIES = '/Activities';
  static VALID_DATA_USER = '/ValidDataUser';
  static REQUEST_KYC_VALIDATION = '/RequestKycUser';
  static LANGUAGE_FILES = '/LanguageFiles/release'; //no se distingue entre dev y release
  static LANGUAGE_FILES_VERSION = '/LanguageFiles/currentVersion';
  static SYSTEM_CONFIG = 'SystemConfig';
  static USER = 'Users';
  static USER_BALANCE = 'DynamicST/userBalance'
  static USER_FAVORITOS = 'DynamicST/lastActions'
  static USER_PENDING = 'PendingActivities'
  static INTERNAL_NOTIFICATIONS = 'MyNotifications'

  static LAST_ACTIONS = 'DynamicST/lastActions';
  static GET_CONTACTS = 'MatchingUsers';
  static SEARCH_ACTIVITY = 'SearchActivity';
  static GET_USER_BY_EMAIL = 'DynamicST/searchUsers';
  static GET_MERCHANTS = 'ShortPfsysMerchants';
  static SEND_ACTIVITY = 'SendActivity';
  static PAY_USER = 'PayActivity';
  static FULL_SERVICES_USER = 'FullUserServices';

  static CANCEL_PENDING_ACTIVITY = "CancelPendingActivities"

  static FULL_ACTIVITIES = 'FullActivities';

  static PF_CARDS = 'UsrPFCards';
  static REQUEST_CARD = 'MyCardActions/myRequest';
  static REQUEST_CARD_FORM = 'MyCardActions/myFormRequest';
  static RESET_PIN = 'MyCardActions/unblockPin';
  static REQUEST_CARD_SAVE = 'RequestCardUser'
  static USER_CREDIT_CARDS = 'UsrRelationsCards';

  static REMOTE_USER_PREFERENCES = 'UserPreference';
  static PF_ACTIONS_CARDS = 'ActionsUsrPFCards';

  static PF_USER_BANK = 'UsrUsrbankAccounts';

  static PF_BANK = 'CfgBanks';

  static PF_USER_BANK_REQUEST = 'UsrFundRequest';

  static PF_USER_SERVICES = "FullUserServicesApp";
  static PF_BALANCE_SERVICES = "UserPfwServices";
  static PF_SERVICES_TYPE = "PfwServices";
  static PF_USER_SERVICES_INACTIVE = "UserServices";

  static GET_MERCHANT = "ShortPfsysMerchants";
  static GET_MERCHANT_BY_QR = "QrProcessInfo";
  static GET_CHECKOUT_MERCHANT = "PaymentLinkResult";

  static REGISTER_EXTERNAL_CARD = "RegisterCardUser";

  static ASANA_TASK = "AsanaTasks";

  static DELTE_EXTERNAL_CARD = "DeleteCardUser";

  static REVALID_CARD_USER = "RevalidCardUser";

  static ACCOUNT_LIMITS = "AccountLimits";


  static USER_FUND_REJECT = "UsrFundReject";

  static REQUEST_TOKEN_API_URL = "/middle/api/v1/RequestTokenApi"


}


