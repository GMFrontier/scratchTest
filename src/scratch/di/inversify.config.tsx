import { Container } from 'inversify';
import BiometricViewModel from '../../core/presentation/utils/biometric/BiometricViewModel';
import { TYPES } from './types';
import LocalRepository from '../../core/domain/repository/LocalRepository';
import LocalRepositoryImpl from '../../core/data/sources/local/LocalRepositoryImpl';

//inicializacion
const container = new Container({ autoBindInjectable: true });

//Repositories
container.bind<LocalRepository>(TYPES.LocalRepository).to(LocalRepositoryImpl);

//Viewmodels
container.bind<BiometricViewModel>(TYPES.BiometricViewModel).to(BiometricViewModel).inSingletonScope();

export default container;
