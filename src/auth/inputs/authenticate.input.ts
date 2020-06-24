import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class AuthenticateInput {
    @Field()
    username: string;

    @Field()
    password: string;
}