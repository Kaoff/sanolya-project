import { Repository } from 'typeorm';
import { Hero } from './hero.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateHeroInput } from './inputs/create-hero.input';
import { User } from 'src/user/user.entity';

@Injectable()
export class HeroService {
    constructor(
        @InjectRepository(Hero)
        private heroRepository: Repository<Hero>
    ) {}

    async getHero(id: string, user: User) {
        const hero = await this.heroRepository.findOne({ where: {
            id,
            userId: user.id,
        }});

        if (!hero) {
            throw new NotFoundException('This hero was not found');
        }

        return hero;
    }

    getManyHeroes(heroIds: string[]): Promise<Hero[]> {
        return this.heroRepository.find({
            where: {
                id: {
                    $in: heroIds,
                },
            },
        });
    }

    async createHero(createHeroInput: CreateHeroInput, user: User) {
        const { name } = createHeroInput;

        const hero = this.heroRepository.create({
            name,
            id: uuid(),
            magicalPotential: 1,
            physicalPotential: 1,
            luck: 1,
            // user,
        });

        return this.heroRepository.save(hero);
    }
}
