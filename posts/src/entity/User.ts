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
    allLikesAmount: number

    @Column()
    dateOfCreation: string

}