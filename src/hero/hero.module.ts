import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroResolver } from './hero.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hero } from './hero.entity';
import { AuthModule } from 'src/auth/auth.module';
// import { UserModule } from 'src/user/user.module';
// import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Hero,
    ]),
    AuthModule,
  ],
  providers: [HeroService, HeroResolver],
  exports: [HeroService],
})
export class HeroModule {}
