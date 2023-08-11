import { Response } from 'express';
import { Builder } from 'builder-pattern';
import {
  BaseHttpPaginatedResponseDto,
  BaseHttpResponseDto,
} from '../dto/base.http.response.dto';

export interface BaseHttpResponseHelperRequest<T, K> {
  res: Response;
  data: T;
  message: string;
  statusCode: number;
  error?: K;
}

export function baseHttpResponseHelper<T, K>(
  res: Response,
  props: Partial<BaseHttpResponseDto<T, K>>,
): Response<BaseHttpResponseDto<T, K>> {
  const { data, message, statusCode, error } = props;

  const getStatusCode = statusCode || 200;

  const builder = Builder<BaseHttpResponseDto<T, K>>({
    message: props?.message || 'Success',
    statusCode: getStatusCode,
    data: props.data,
    error: props?.error || null,
  });

  return res.status(getStatusCode).json(builder.build());
}

export function basePaginatedResponseHelper<T, K>(
  res: Response,
  props: Partial<BaseHttpPaginatedResponseDto<T, K>>,
): Response<BaseHttpPaginatedResponseDto<T, K>> {
  const { data, total, page, per_page, total_page, message } = props;

  const totalPage = Math.ceil(total / per_page);
  const getStatusCode = props?.statusCode || 200;

  const responseBuilder = Builder<BaseHttpPaginatedResponseDto<T, K>>({
    message,
    statusCode: getStatusCode,
    data,
    total,
    page,
    per_page,
    total_page: total_page || totalPage,
  });

  return res.status(getStatusCode).json(responseBuilder.build());
}
