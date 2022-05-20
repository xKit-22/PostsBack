import {Entity, Column, OneToMany, ManyToMany, PrimaryColumn, BeforeInsert} from "typeorm";
import {Post} from "./Post";
import {Comment} from "./Comment";
import {JoinTable} from "typeorm";

const shortid = require('shortid');

@Entity('users')
export class User {
    @PrimaryColumn("varchar", {
        length: 20
    })
    id: string;

    @BeforeInsert()
    setId() {
        this.id = shortid.generate();
    }

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
