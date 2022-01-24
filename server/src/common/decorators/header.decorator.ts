import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CheckHeader = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers;
  },
);
