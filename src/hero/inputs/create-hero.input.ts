import { MinLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateHeroInput {
    @MinLength(5)
    @Field()
    name: string;
}