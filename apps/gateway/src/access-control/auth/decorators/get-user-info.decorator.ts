import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUserInfo = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const { user } = request;
    if (!user) {
      throw new InternalServerErrorException('user out of context');
    }
    return { userId: user._id, organization: user.organization };
  },
);
