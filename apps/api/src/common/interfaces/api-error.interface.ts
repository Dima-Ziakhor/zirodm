export interface ApiError<T = unknown> {
  statusCode: number;
  code: string;
  message: string;
  details?: T;
  timestamp: string;
  path: string;
}
