import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserType } from 'src/user/user.type';

@ObjectType('Hero')
export class HeroType {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    physicalPotential: number;

    @Field()
    magicalPotential: number;

    @Field()
    luck: number;

    @Field(() => UserType)
    user: string;
}