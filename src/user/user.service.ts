import { Injectable, NotFoundException, ForbiddenException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserRole } from './enums/user-roles.enum';
import { GraphQLAuthGuard } from 'src/auth/graphql.guard';

@Injectable()
@UseGuards(GraphQLAuthGuard)
export class UserService {
    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>,
    ) {}

    async getUser(id: string, user: User) {
        const isUserAdmin = [UserRole.SUPER_ADMIN, UserRole.ADMIN].some(r => user.roles.includes(r));
        const gUser = await this.userRepository.findOne({ id })
        
        if (!isUserAdmin) {
            throw new ForbiddenException('You are not authorized to perform this request');
        }

        if (!gUser) {
            throw new NotFoundException('User has not been found');
        }

        console.log('*** gUser', gUser);

        return gUser;
    }

}
