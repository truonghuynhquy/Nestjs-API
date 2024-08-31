import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (
    key: string, //"id", "firstName", "lastName"....
    context: ExecutionContext,
  ) => {
    const request: Express.Request = context.switchToHttp().getRequest();
    const user = request.user;
    return key ? user?.[key] : user;
  },
);
