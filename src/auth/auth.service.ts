import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { AuthenticateInput } from './inputs/authenticate.input';
import * as argon2 from 'argon2';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { SignUpInput } from './inputs/sign-up.input';
import { v4 as uuid } from 'uuid';
import { UserRole } from 'src/user/enums/user-roles.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async signUp(signUpInput: SignUpInput) {
        const { username, password, email } = signUpInput;
        
        const user = this.userRepository.create({
            id: uuid(),
            username,
            email,
            password: await argon2.hash(password),
            roles: [UserRole.USER],
        });

        console.log('*** user', user);

        return this.userRepository.save(user);
    }

    async authenticate(authenticateInput: AuthenticateInput) {
        const { username, password } = authenticateInput;

        const user = await this.userRepository.findOne({ username });

        if (!user) {
            throw new UnauthorizedException('Username or password is invalid');
        }

        const verify = await argon2.verify(user.password, password);

        if (!verify) {
            throw new UnauthorizedException('Username or password is invalid');
        }

        const payload: JwtPayload = { username: user.username };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }
}
