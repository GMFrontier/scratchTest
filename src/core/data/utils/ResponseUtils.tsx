import { AxiosError, AxiosResponse } from 'axios';
import { ErrorAPI, ResponseAPI } from '../models/ResponseApi';
import {
  APP_API_DEFAULT_DESCRIPTION,
  APP_API_DEFAULT_MESSAGE,
  AXIOS_NET_ERROR,
  CLIENT_NETWORK_ERROR,
  GENERIC_ERROR,
  INVALID_AUTHORIZATION,
  INVALID_EMAIL_OR_PASSWORD,
  NOT_A_WALLET_USER,
  PRE_REGISTER_USER,
  SESSION_EXPIRED,
  USER_NOT_LOGGED_IN,
} from '../../constants/ApiConstants';

class ResponseUtils {
  static parseToResponseAPI(response: AxiosResponse<ResponseAPI>): ResponseAPI {
    const { message, data, headerStatus, serverTime, requestId } =
      response.data;
    const parsedResponse: ResponseAPI = {
      message,
      data,
      headerStatus,
      serverTime,
      requestId,
    };
    return parsedResponse;
  }

  static parseToErrorAPI(error: ResponseAPI): ErrorAPI {
    const parsedError: ErrorAPI = {
      code: error.headerStatus.code ?? GENERIC_ERROR,
      description: error.headerStatus.description ?? APP_API_DEFAULT_DESCRIPTION,
      message: error.message ?? APP_API_DEFAULT_MESSAGE,
    };
    return parsedError;
  }

  static newErrorAPI(options: {
    code?: number;
    description?: string;
    message?: string;
  }): ErrorAPI {
    const { code = 0, description = '', message = '' } = options;
    const errorAPI: ErrorAPI = {
      code: code,
      description: description,
      message: message,
    };
    return errorAPI;
  }

  static handleBadResponses(response: ResponseAPI): ErrorAPI | undefined {
    if (
      response.headerStatus.code >= 300 && response.headerStatus.code <= 800
    ) {
      return ResponseUtils.newErrorAPI({
        code: response.headerStatus.code ?? GENERIC_ERROR,
        description: response.headerStatus.description ?? APP_API_DEFAULT_DESCRIPTION,
        message: response.message ?? APP_API_DEFAULT_MESSAGE,
      });
    }
    if (
      response.headerStatus.code === PRE_REGISTER_USER &&
      response.message ===
      'We sent you an email with a confirmation code, please copy the code and try again!!!'
    ) {
      //es un pre registro que se registra como error a ojos de backend por faltarle el emailCode
      return undefined;
    }
    return undefined;
  }
  static handleAxiosErrorResponses(error: any): ErrorAPI {
    if (error.code === AXIOS_NET_ERROR) {
      return ResponseUtils.newErrorAPI({
        code: CLIENT_NETWORK_ERROR,
        description: error.name,
        message: error.message,
      });
    }
    return ResponseUtils.parseToErrorAPI(error as ResponseAPI);
  }

  static handleBackendErrorResponses(
    error: ErrorAPI,
    logoutCallback: () => void,
  ): ErrorAPI {
    if (
      error.code === NOT_A_WALLET_USER &&
      error.message === 'Invalid Login Platform WALLET'
    ) {
      //hacer algo, pasar mensaje correcto de error al user para toast, etc
      return {
        ...error,
        message:
          'No es posible iniciar sesión con este correo ya que está registrado en nuestra plataforma de comercios. Recuerda que esta APP está enfocada en uso personal. Favor registrarse con un email nuevo.',
      };
    }
    if (error.code === INVALID_EMAIL_OR_PASSWORD) {
      //hacer algo, pasar mensaje correcto de error al user para toast, etc
      return {
        ...error,
        message: 'Usuario/Contraseña no válida',
      };
    }
    if (
      //Sólamente aplica SESSION_EXPIRED.includes(code), el resto es para pruebas
      error.code === USER_NOT_LOGGED_IN ||
      error.code === SESSION_EXPIRED
    ) {
      logoutCallback(); //mejorar codigo
      return {
        ...error,
        message: 'Sesión expirada, redirigiendolo al login.',
      };
    }
    return error;
  }
}

export default ResponseUtils;
