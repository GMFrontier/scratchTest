import BottomTabNavigator from '../../core/presentation/components/navigation/BottomTabNavigator';
import { LoginScreen } from '../auth/presentation/login/LoginScreen';
import { PasswordScreen } from '../auth/presentation/login/PasswordScreen';
import { HomeScreen } from '../home/presentation/HomeScreen';
import { OnBoardingScreen } from '../onboarding/OnBoardingScreen';
import { SplashScreen } from '../splash/presentation/SplashScreen';
import { CardsScreen } from '../cards/presentation/CardsScreen';
import { SettingsScreen } from '../settings/presentation/SettingsScreen';
import { RecoverPasswordScreen } from '../auth/presentation/recover_pin/RecoverPasswordScreen';
import { RecoverPasswordEmailValidationScreen } from '../auth/presentation/recover_pin/RecoverPasswordEmailValidationScreen';
import { RecoverPasswordCreateScreen } from '../auth/presentation/recover_pin/RecoverPasswordCreateScreen';
import { RegisterScreen } from '../auth/presentation/register/RegisterScreen';
import { RegisterFormScreen } from '../auth/presentation/register/RegisterFormScreen';
import { RegisterPhoneValidationScreen } from '../auth/presentation/register/RegisterPhoneValidationScreen';
import { RegisterEmailValidationScreen } from '../auth/presentation/register/RegisterEmailValidationScreen';
import { RegisterAddressScreen } from '../auth/presentation/register/RegisterAddressScreen';
import { RegisterFinancialScreen } from '../auth/presentation/register/RegisterFinancialScreen';
import { RegisterIdValidationScreen } from '../auth/presentation/register/RegisterIdValidationScreen';
import { RegisterStepsScreen } from '../auth/presentation/register/RegisterStepsScreen';
import { RegisterFinancial2Screen } from '../auth/presentation/register/RegisterFinancial2Screen';
import { RegisterCompleteScreen } from '../auth/presentation/register/RegisterCompleteScreen';
import SelectPhoneFlagScreen from '../auth/presentation/register/SelectPhoneFlagScreen';
import { MovementsScreen } from '../home/presentation/movements/MovementsScreen';
import { DetailsScreen } from '../home/presentation/movements/DetailsScreen';
import { EditCategoryScreen } from '../home/presentation/movements/EditCategoryScreen';
import { AddCommentScreen } from '../home/presentation/movements/AddCommentScreen';
import { ProfileScreen } from '../settings/presentation/ProfileScreen';
import { AboutUsScreen } from '../settings/presentation/AboutUsScreen';
import { PrivactPolicyScreen } from '../settings/presentation/PrivactPolicyScreen';
import { TyCScreen } from '../settings/presentation/TyCScreen';
import { FAQScreen } from '../settings/presentation/FAQScreen';
import { SupportScreen } from '../settings/presentation/SupportScreen';
import { PointsScreen } from '../points/presentation/PointsScreen';
import { CardsTyCScreen } from '../cards/presentation/request/CardsTyCScreen';
import { AchDataScreen } from '../cards/presentation/request/AchDataScreen';
import { AchTransferScreen } from '../cards/presentation/request/AchTransferScreen';
import { AchReceiptScreen } from '../cards/presentation/request/AchReceiptScreen';
import { PaymentDataScreen } from '../cards/presentation/request/PaymentDataScreen';
import { PaymentMethodScreen } from '../cards/presentation/request/PaymentMethodScreen';
import { CardScreen } from '../cards/presentation/CardScreen';
import { CardDetailsScreen } from '../cards/presentation/CardDetailsScreen';
import { DeliveryScreen } from '../cards/presentation/delivery/DeliveryScreen';
import { EditScreen } from '../cards/presentation/delivery/EditScreen';
import { MapScreen } from '../cards/presentation/delivery/MapScreen';
import { ActivationScreen } from '../cards/presentation/activation/ActivationScreen';
import { PinInputScreen } from '../cards/presentation/activation/PinInputScreen';
import { ChangePinScreen } from '../cards/presentation/ChangePinScreen';
import { NewPinScreen } from '../cards/presentation/NewPinScreen';

export const ROUTES = {
  Navigator: {
    BottomTabNavigator: { screen: BottomTabNavigator, name: 'BottomTabNavigator' },
  },
  Splash: {
    SplashScreen: { screen: SplashScreen, name: 'SplashScreen' },
  },
  Auth: {
    LoginScreen: { screen: LoginScreen, name: 'LoginScreen' },
    PasswordScreen: { screen: PasswordScreen, name: 'PasswordScreen' },
    RecoverPasswordScreen: { screen: RecoverPasswordScreen, name: 'RecoverPasswordScreen' },
    RecoverPasswordEmailValidationScreen: { screen: RecoverPasswordEmailValidationScreen, name: 'RecoverPasswordEmailValidationScreen' },
    RecoverPasswordCreateScreen: { screen: RecoverPasswordCreateScreen, name: 'RecoverPasswordCreateScreen' },
    RegisterScreen: { screen: RegisterScreen, name: 'RegisterScreen' },
    RegisterFormScreen: { screen: RegisterFormScreen, name: 'RegisterFormScreen' },
    RegisterPhoneValidationScreen: { screen: RegisterPhoneValidationScreen, name: 'RegisterPhoneValidationScreen' },
    RegisterEmailValidationScreen: { screen: RegisterEmailValidationScreen, name: 'RegisterEmailValidationScreen' },
    RegisterAddressScreen: { screen: RegisterAddressScreen, name: 'RegisterAddressScreen' },
    RegisterFinancialScreen: { screen: RegisterFinancialScreen, name: 'RegisterFinancialScreen' },
    RegisterIdValidationScreen: { screen: RegisterIdValidationScreen, name: 'RegisterIdValidationScreen' },
    RegisterStepsScreen: { screen: RegisterStepsScreen, name: 'RegisterStepsScreen' },
    RegisterFinancial2Screen: { screen: RegisterFinancial2Screen, name: 'RegisterFinancial2Screen' },
    RegisterCompleteScreen: { screen: RegisterCompleteScreen, name: 'RegisterCompleteScreen' },
    SelectPhoneFlagScreen: { screen: SelectPhoneFlagScreen, name: 'SelectPhoneFlagScreen' },
  },
  OnBoarding: {
    OnBoardingScreen: { screen: OnBoardingScreen, name: 'OnBoardingScreen' },
  },
  Settings: {
    ProfileScreen: { screen: ProfileScreen, name: 'ProfileScreen' },
    SettingsScreen: { screen: SettingsScreen, name: 'SettingsScreen' },
    AboutUsScreen: { screen: AboutUsScreen, name: 'AboutUsScreen' },
    PrivactPolicyScreen: { screen: PrivactPolicyScreen, name: 'PrivactPolicyScreen' },
    TyCScreen: { screen: TyCScreen, name: 'TyCScreen' },
    FAQScreen: { screen: FAQScreen, name: 'FAQScreen' },
    SupportScreen: { screen: SupportScreen, name: 'SupportScreen' },
  },
  Home: {
    HomeScreen: { screen: HomeScreen, name: 'HomeScreen' },
    MovementsScreen: { screen: MovementsScreen, name: 'MovementsScreen' },
    DetailsScreen: { screen: DetailsScreen, name: 'DetailsScreen' },
    EditCategoryScreen: { screen: EditCategoryScreen, name: 'EditCategoryScreen' },
    AddCommentScreen: { screen: AddCommentScreen, name: 'AddCommentScreen' },
  },
  Cards: {
    CardsScreen: { screen: CardsScreen, name: 'CardsScreen' },
    CardScreen: { screen: CardScreen, name: 'CardScreen' },
    CardDetailsScreen: { screen: CardDetailsScreen, name: 'CardDetailsScreen' },
    ChangePinScreen: { screen: ChangePinScreen, name: 'ChangePinScreen' },
    NewPinScreen: { screen: NewPinScreen, name: 'NewPinScreen' },
    // solicitud
    CardsTyCScreen: { screen: CardsTyCScreen, name: 'CardsTyCScreen' },
    PaymentMethodScreen: { screen: PaymentMethodScreen, name: 'PaymentMethodScreen' },
    // por ach
    AchDataScreen: { screen: AchDataScreen, name: 'AchDataScreen' },
    AchTransferScreen: { screen: AchTransferScreen, name: 'AchTransferScreen' },
    AchReceiptScreen: { screen: AchReceiptScreen, name: 'AchReceiptScreen' },
    // por tarjeta
    PaymentDataScreen: { screen: PaymentDataScreen, name: 'PaymentDataScreen' },
    //delivery
    Delivery: {
      DeliveryScreen: { screen: DeliveryScreen, name: 'DeliveryScreen' },
      EditScreen: { screen: EditScreen, name: 'EditScreen' },
      MapScreen: { screen: MapScreen, name: 'MapScreen' },
    },
    Activation: {
      ActivationScreen: { screen: ActivationScreen, name: 'ActivationScreen' },
      PinInputScreen: { screen: PinInputScreen, name: 'PinInputScreen' },
    }
  },
  Points: {
    PointsScreen: { screen: PointsScreen, name: 'PointsScreen' },
  },
};
