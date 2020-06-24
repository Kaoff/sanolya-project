import { InputType, Field } from "@nestjs/graphql";
import { MinLength, IsEmail, Matches } from "class-validator";

@InputType()
export class SignUpInput {
    @MinLength(5)
    @Field()
    username: string;

    @MinLength(8)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'password_too_weak' },
    )
    @Field()
    password: string;

    @IsEmail()
    @Field()
    email: string;
}