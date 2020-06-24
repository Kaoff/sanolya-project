import { Entity, BaseEntity, ObjectIdColumn, PrimaryColumn, OneToMany, Column, Unique } from "typeorm";
import { Hero } from "src/hero/hero.entity";
import { UserRole } from "./enums/user-roles.enum";

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    roles: UserRole[];
    
    // @Column()
    // heroes: string[];
}