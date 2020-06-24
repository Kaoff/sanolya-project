import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType('JwtTokenType')
export class JwtTokenType {
    @Field()
    accessToken: string;
}