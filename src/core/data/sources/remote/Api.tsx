import axios, { AxiosError, AxiosResponse } from 'axios';
import { ResponseAPI } from '../../models/ResponseApi';
import ResponseUtils from '../../utils/ResponseUtils';
import Config from 'react-native-config';
import { NativeModules } from 'react-native';
import { getTimeZone } from "react-native-localize";

const { UtilsModule } = NativeModules;

/* Más adelante utilizar el url correspondiente dependiendo del flavor de la app
 * dev: https://middle-test.pfserver.net/PFManagementServices/api/v1/
 * prod: https://admin.paguelofacil.com/PFManagementServices/api/v1/
 *
 */

const setAuthorizationToken = (token: string) => {
  api.defaults.headers.Authorization = `${UtilsModule.l(Config.FLAVOR)}|${token}`;
};

const setAuthorizationTokenDefault = () => {
  api.defaults.headers.Authorization = `${UtilsModule.l(Config.FLAVOR)}`;
};

const setBaseToken = (token: string) => {
  api.defaults.headers.Authorization = `${token}`;
};

const getAuthorizationToken = (): string => {
  return api.defaults.headers.Authorization?.toString() ?? ""
};

const api = axios.create({
  baseURL: Config.API_URL,
  headers: {
    'Content-Type': 'application/json',
    platform: '1',
    Authorization: UtilsModule.l(Config.FLAVOR),
    offset: -180, //crear utils get timezone offset
    timezone: getTimeZone(),
    fcmToken: '""', //token identicatorio del dispositivo que provee firebase para su FCM
  },
  timeout: 10000,
});

api.interceptors.request.use(request => {
  showRequestLogs(request);
  return request;
});

api.interceptors.response.use(
  (response: AxiosResponse<ResponseAPI>) => {
    showResponseLogs(response);
    const parsedResponse = ResponseUtils.parseToResponseAPI(response);
    const badResponse = ResponseUtils.handleBadResponses(parsedResponse);
    if (typeof badResponse !== 'undefined') {
      console.log('Bad response: ' + JSON.stringify(badResponse));
      return Promise.reject(badResponse);
    }
    return { ...response, data: parsedResponse };
  },
  (error: AxiosError) => {
    const errorResponse = ResponseUtils.handleAxiosErrorResponses(error);
    return Promise.reject(errorResponse);
  },
);

const showRequestLogs = (request: any) => {
  if (__DEV__) {
    const { method, data, headers } = request;
    const { Authorization, fcmToken } = headers;
    const fullURL = api.getUri(request);
    console.log('');
    console.log('');
    console.log("---  HTTP REQUEST START  ----");
    console.log('Method:', method?.toUpperCase());
    console.log('url:', fullURL);
    console.log('Authorization Header:', Authorization);
    console.log('FCM token:', fcmToken);
    console.log('Body:', JSON.stringify(data));
    console.log("---  HTTP REQUEST END  ---");
    console.log('');
    console.log('');
  }
};
const showResponseLogs = (response: AxiosResponse) => {
  if (__DEV__) {
    console.log("--- HTTP RESPONSE START  ----");
    console.log('Method:', response.config.method?.toUpperCase());
    console.log('url:', api.getUri(response.config));
    console.log('response:', JSON.stringify(response.data));
    console.log("---  HTTP RESPONSE END  ---");
    console.log('');
  }
};
export { api, setAuthorizationToken, setAuthorizationTokenDefault, getAuthorizationToken, setBaseToken };
