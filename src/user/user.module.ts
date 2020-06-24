import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserResolver } from './user.resolver';
import { HeroModule } from '../hero/hero.module';
import { HeroService } from 'src/hero/hero.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User ]),
    AuthModule,
    HeroModule,
  ],
  providers: [UserService, UserResolver, /*HeroService*/],
  exports: [UserService]
})
export class UserModule {}
