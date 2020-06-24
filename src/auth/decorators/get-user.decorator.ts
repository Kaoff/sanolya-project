import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/user/user.entity";
import { GqlExecutionContext } from "@nestjs/graphql";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
    const req = GqlExecutionContext.create(ctx).getContext().req;
    return req.user;
});