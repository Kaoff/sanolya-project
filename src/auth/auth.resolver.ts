import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { JwtTokenType } from './jwt-token.type';
import { AuthenticateInput } from './inputs/authenticate.input';
import { AuthService } from './auth.service';
import { SignUpInput } from './inputs/sign-up.input';
import { User } from 'src/user/user.entity';
import { UserType } from 'src/user/user.type';

@Resolver('Auth')
export class AuthResolver {
    constructor(
        private authService: AuthService
    ) {}

    @Mutation(() => UserType)
    signUp(
        @Args('signUpInput') signUpInput: SignUpInput,
    ): Promise<User> {
        return this.authService.signUp(signUpInput);
    }

    @Query(() => JwtTokenType)
    authenticate(
        @Args('authenticateInput') authenticateInput: AuthenticateInput,
    ) {
        return this.authService.authenticate(authenticateInput);
    }
    
}
