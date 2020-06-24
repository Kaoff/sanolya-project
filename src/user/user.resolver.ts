import { Resolver, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType } from './user.type';
import { User } from './user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UseGuards, Inject, forwardRef } from '@nestjs/common';
import { GraphQLAuthGuard } from 'src/auth/graphql.guard';
import { HeroService } from 'src/hero/hero.service';

@Resolver('User')
@UseGuards(GraphQLAuthGuard)
export class UserResolver {
    constructor(
        private userService: UserService,
        // @Inject(forwardRef(() => HeroService))
        // private heroService: HeroService,
    ) {}

    @Query(() => UserType)
    user(
        @Args('id') id: string,
        @GetUser() user: User,
    ): Promise<User> {
        return this.userService.getUser(id, user);
    }

    // @ResolveField()
    // async heroes(@Parent() user: User) {
    //     return this.heroService.getManyHeroes(user.heroes);
    // }
}
