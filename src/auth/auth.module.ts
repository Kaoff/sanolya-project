import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import * as config from 'config';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET || config.get('jwt.secret'),
            signOptions: {
                expiresIn: process.env.JWT_EXPIRES_IN || config.get('jwt.expiresIn'),
            },
        }),
        TypeOrmModule.forFeature([ User ]),
    ],
    providers: [AuthResolver, UserService, JwtStrategy, AuthService],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
