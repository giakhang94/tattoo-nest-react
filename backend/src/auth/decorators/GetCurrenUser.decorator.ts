import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    console.log('get me');
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
