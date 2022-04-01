import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nickname: string

    @Column()
    avatar: string

    @Column()
    postsAmount: number

    @Column()
    subscribersAmount: number

    @Column()
    subscriptionsAmount: number

    @Column()
    allPostLikesAmount: number

    @Column()
    dateOfCreation: string

    @Column()
    userLogin: string

    @Column()
    userPassword: string

}