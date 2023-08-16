import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

/**
 * CurrentUserOptions Interface for the decorator options object
 */
export interface CurrentUserOptions {
  field?: string;
  required?: boolean;
}

/**
 * Decorator to get the current user from the request.
 * @param options
 * @returns {(target: object, key: string) => void}
 */
export const CurrentUser: (options?: CurrentUserOptions) => ParameterDecorator =
  createParamDecorator(
    (options: CurrentUserOptions = {}, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      const user = request.user;
      if (options.required && !user) {
        throw new UnauthorizedException();
      }
      return options.field ? user?.[options.field] : user;
    },
  );
