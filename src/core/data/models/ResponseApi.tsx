export interface ResponseAPI {
  message?: string | null;
  data?: any;
  headerStatus: HeaderStatus;
  serverTime?: string | null;
  requestId?: string | null;
}

export interface HeaderStatus {
  code?: number | null;
  description?: string | null;
}

export interface ErrorAPI {
  code: number;
  description: string;
  message: string;
}
