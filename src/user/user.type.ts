import { ObjectType, Field, ID } from '@nestjs/graphql';
import { HeroType } from 'src/hero/hero.type';
import { UserRole } from './enums/user-roles.enum';

@ObjectType('User')
export class UserType {
    @Field(() => ID)
    id: string;

    @Field()
    email: string;

    @Field()
    username: string;

    @Field()
    password: string;

    @Field(() => String)
    roles: UserRole[];
    
    // @Field(() => [HeroType])
    // heroes: string[];
}