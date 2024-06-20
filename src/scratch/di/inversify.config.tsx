import { Container } from 'inversify';
import BiometricViewModel from '../../core/presentation/utils/biometric/BiometricViewModel';
import { TYPES } from './types';
import LocalRepository from '../../core/domain/repository/LocalRepository';
import LocalRepositoryImpl from '../../core/data/sources/local/LocalRepositoryImpl';
import RegisterViewModel from '../auth/presentation/register/RegisterViewModel';
import RegisterRepository from '../auth/domain/repositories/RegisterRepository';
import RegisterRepositoryImpl from '../auth/data/repositories/RegisterRepositoryImpl';

//inicializacion
const container = new Container({ autoBindInjectable: true });

//Repositories
container.bind<LocalRepository>(TYPES.LocalRepository).to(LocalRepositoryImpl);
container.bind<RegisterRepository>(TYPES.RegisterRepository).to(RegisterRepositoryImpl);

//Viewmodels
container.bind<BiometricViewModel>(TYPES.BiometricViewModel).to(BiometricViewModel).inSingletonScope();
container.bind<RegisterViewModel>(TYPES.RegisterViewModel).to(RegisterViewModel).inSingletonScope();

export default container;
