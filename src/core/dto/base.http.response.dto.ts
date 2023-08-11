export class BaseHttpResponseDto<T, K> {
  message: string;
  statusCode: number;
  data: T;
  error: K;
}

export class BaseHttpPaginatedResponseDto<T, K> extends BaseHttpResponseDto<
  T,
  K
> {
  total: number;
  page: number;
  per_page: number;
  total_page: number;
}
