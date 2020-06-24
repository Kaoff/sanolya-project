import { Resolver, Args, Mutation } from "@nestjs/graphql";
import { HeroType } from "./hero.type";
import { HeroService } from "./hero.service";
import { Query } from "@nestjs/graphql";
import { CreateHeroInput } from "./inputs/create-hero.input";
import { UseGuards } from "@nestjs/common";
import { GetUser } from "../auth/decorators/get-user.decorator";
import { User } from "../user/user.entity";
import { GraphQLAuthGuard } from "../auth/graphql.guard";

@Resolver(() => HeroType)
@UseGuards(GraphQLAuthGuard)
export class HeroResolver {
    constructor(
        private heroService: HeroService,
    ) {}

    @Query(() => HeroType)
    hero(
        @Args('id') id: string,
        @GetUser() user: User,
    ) {
        return this.heroService.getHero(id, user);
    }

    @Mutation(() => HeroType)
    createHero(
        @Args('createHeroInput') createHeroInput: CreateHeroInput,
        @GetUser() user: User,
    ) {
        console.log('*** user', user);
        return this.heroService.createHero(createHeroInput, user);
    }
}