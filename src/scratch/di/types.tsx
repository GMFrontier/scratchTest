const TYPES = {
  /* REPOSITORIES */
  //splash
  SplashRepository: Symbol.for('SplashRepository'),
  SystemConfigRepository: Symbol.for('SystemConfigRepository'),
  //user
  RemotePreferenceRepository: Symbol.for('RemotePreferenceRepository'),
  AccountLimitsRespository: Symbol.for('AccountLimitsRespository'),
  //login
  LoginRepository: Symbol.for('LoginRepository'),
  LocalRepository: Symbol.for('LocalRepository'),
  //validacion telefono
  PhoneVerificationRepository: Symbol.for('PhoneVerificationRepository'),
  //validacion ID
  IdValidationRepository: Symbol.for('IdValidationRepository'),
  //Actions Card
  PFCardActionRepository: Symbol.for('PFCardActionRepository'),
  //registro
  RegisterRepository: Symbol.for('RegisterRepository'),
  MetaMapRepository: Symbol.for('MetaMapRepository'),
  //profile
  ProfileRepository: Symbol.for('ProfileRepository'),
  TransactionRepository: Symbol.for('TransactionRepository'),
  MerchantsRepository: Symbol.for('MerchantsRepository'),
  RechargueRepository: Symbol.for('RechargueRepository'),
  PayServicesRepository: Symbol.for('PayServicesRepository'),

  BannerRepository: Symbol.for('BannerRepository'),


  //Home
  HomeRepository: Symbol.for('HomeRepository'),
  InternalNotificationsRepository: Symbol.for('InternalNotificationsRepository'),

  //Card
  ZeroCardRepository: Symbol.for('ZeroCardRepository'),

  //ExternalCard
  ExternalCardRepository: Symbol.for('ExternalCardRepository'),

  //CardRequest
  PFCardRequestFormRepository: Symbol.for('PFCardRequestFormRepository'),


  //Bank
  BankRepository: Symbol.for('BankRepository'),


  /* --------------------------------------------- */
  /* USE CASES */
  SaveUserLocalUseCase: Symbol.for('SaveUserLocalUseCase'),
  GetUserLocalUseCase: Symbol.for('GetUserLocalUseCase'),

  GetPendingActivitiesUseCase: Symbol.for('GetPendingActivitiesUseCase'),
  //splash
  GetAppTranslationsUseCase: Symbol.for('GetAppTranslationsUseCase'),
  //login
  LoginUseCase: Symbol.for('LoginUseCase'),
  //Preferences
  PreferencesUseCase: Symbol.for('PreferencesUseCase'),
  //registro
  RegistrationUseCase: Symbol.for('RegistrationUseCase'),
  PreRegistrationUseCase: Symbol.for('PreRegistrationUseCase'),
  /* --------------------------------------------- */
  /* VIEWMODELS */
  SplashViewModel: Symbol.for('SplashViewModel'),
  BaseViewModel: Symbol.for('BaseViewModel'),
  WebViewViewModel: Symbol.for('WebViewViewModel'),
  LoginViewModel: Symbol.for('LoginViewModel'),
  RegisterViewModel: Symbol.for('RegisterViewModel'),
  MetaMapViewModel: Symbol.for('MetaMapViewModel'),
  PayQrViewModel: Symbol.for('PayQrViewModel'),
  SettingsViewModel: Symbol.for('SettingsViewModel'),
  HomeViewModel: Symbol.for('HomeViewModel'),
  PayUserViewModel: Symbol.for('PayUserViewModel'),
  UserOptionsViewModel: Symbol.for('UserOptionsViewModel'),
  CardViewModel: Symbol.for('CardViewModel'),
  TransactionsViewModel: Symbol.for('TransactionsViewModel'),
  PayShopViewModel: Symbol.for('PayShopViewModel'),
  RegisterValidationConfirmViewModel: Symbol.for('RegisterValidationConfirmViewModel'),
  ChargueUserViewModel: Symbol.for('ChargueUserViewModel'),
  CryptoViewModel: Symbol.for('CryptoViewModel'),
  ProfileViewModel: Symbol.for('ProfileViewModel'),
  BankViewModel: Symbol.for('BankViewModel'),
  RechargeViewModel: Symbol.for('RechargeViewModel'),
  IdValidationViewModel: Symbol.for('IdValidationViewModel'),
  PfCardActionViewModel: Symbol.for('PfCardActionViewModel'),
  BiometricViewModel: Symbol.for('BiometricViewModel'),
  PayServicesViewModel: Symbol.for('PayServicesViewModel'),
  PFCardRequestFormViewModel: Symbol.for('PFCardRequestFormViewModel'),
  PFCardRequestInProgressViewModel: Symbol.for('PFCardRequestInProgressViewModel'),
  PFCardRequestCostPhysicalViewModel: Symbol.for('PFCardRequestCostPhysicalViewModel'),
  FavoritesViewModel: Symbol.for('FavoritesViewModel'),
  NotificationsViewModel: Symbol.for('NotificationsViewModel'),
  ExternalCardViewModel: Symbol.for('ExternalCardViewModel'),
  CommunicationViewModel: Symbol.for('CommunicationViewModel'),
  AccountLimitsViewModel: Symbol.for('AccountLimitsViewModel'),
  CardsViewModel: Symbol.for('CardsViewModel'),

};

export { TYPES };