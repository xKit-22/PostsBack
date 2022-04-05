import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import {User} from "./User";
import {Comment} from "./Comment";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    text: string

    @Column()
    picture: string

    @Column()
    likesAmount: number

    @Column()
    authorId: number

    @Column()
    dateOfCreation: string

    @ManyToOne(type => User, user => user.posts) user: User
    @OneToMany(type => Comment, comment => comment.post) comments: Post[]
}