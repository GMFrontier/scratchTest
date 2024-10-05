import { Container } from 'inversify';
import BiometricViewModel from '../../core/presentation/utils/biometric/BiometricViewModel';
import { TYPES } from './types';
import LocalRepository from '../../core/domain/repository/LocalRepository';
import LocalRepositoryImpl from '../../core/data/sources/local/LocalRepositoryImpl';
import RegisterViewModel from '../auth/presentation/register/RegisterViewModel';
import RegisterRepository from '../auth/domain/repositories/RegisterRepository';
import RegisterRepositoryImpl from '../auth/data/repositories/RegisterRepositoryImpl';
import LoginViewModel from '../auth/presentation/login/LoginViewModel';
import LoginRepository from '../auth/domain/repositories/LoginRepository';
import LoginRepositoryImpl from '../auth/data/repositories/LoginRepositoryImpl';
import HomeViewModel from '../home/presentation/HomeViewModel';
import SettingsViewModel from '../settings/presentation/SettingsViewModel';
import CardsViewModel from '../cards/presentation/CardsViewModel';
import HomeRepositoryImpl from '../home/data/repositories/HomeRepositoryImpl';
import HomeRepository from '../auth/domain/repositories/HomeRepository';
import ZeroCardRepositoryImpl from '../cards/data/repositories/ZeroCardRepositoryImpl';
import ZeroCardRepository from '../cards/domain/repositories/ZeroCardRepository';

//inicializacion
const container = new Container({ autoBindInjectable: true });

//Repositories
container.bind<LocalRepository>(TYPES.LocalRepository).to(LocalRepositoryImpl);
container.bind<RegisterRepository>(TYPES.RegisterRepository).to(RegisterRepositoryImpl);
container.bind<LoginRepository>(TYPES.LoginRepository).to(LoginRepositoryImpl);
container.bind<HomeRepository>(TYPES.HomeRepository).to(HomeRepositoryImpl);
container.bind<ZeroCardRepository>(TYPES.ZeroCardRepository).to(ZeroCardRepositoryImpl);

//Viewmodels
container.bind<BiometricViewModel>(TYPES.BiometricViewModel).to(BiometricViewModel).inSingletonScope();
container.bind<RegisterViewModel>(TYPES.RegisterViewModel).to(RegisterViewModel).inSingletonScope();
container.bind<LoginViewModel>(TYPES.LoginViewModel).to(LoginViewModel).inSingletonScope();
container.bind<HomeViewModel>(TYPES.HomeViewModel).to(HomeViewModel).inSingletonScope();
container.bind<SettingsViewModel>(TYPES.SettingsViewModel).to(SettingsViewModel).inSingletonScope();
container.bind<CardsViewModel>(TYPES.CardsViewModel).to(CardsViewModel).inSingletonScope();

export default container;
