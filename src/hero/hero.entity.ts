import { Entity, BaseEntity, Column, ManyToOne, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class Hero extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
    uuid: string;

    @Column()
    name: string;

    @Column()
    physicalPotential: number;

    @Column()
    magicalPotential: number;

    @Column()
    luck: number;

    // @ManyToOne(() => User, user => user.heroes, { eager: false })
    // user: User;

    @Column()
    userId: string;
}