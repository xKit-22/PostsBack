import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany} from "typeorm";
import {Post} from "./Post";
import {Comment} from "./Comment";
import {JoinTable} from "typeorm";

@Entity('users')
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

    @Column()
    userLogin: string

    @Column()
    userPassword: string

    @OneToMany(type => Post, post => post.user) posts: Post[]
    @OneToMany(type => Comment, comment => comment.user) comments: Comment[]

    @ManyToMany(type => User) @JoinTable()
    user: User[]
}
