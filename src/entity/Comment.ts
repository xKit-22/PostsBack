import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {Post} from "./Post";
import {User} from "./User";


@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    postId: number

    @Column()
    text:string

    @Column()
    likesAmount: number

    @Column()
    authorId: number

    @Column()
    dateOfCreation: string

    @ManyToOne(type => Post, post => post.comments) post: Post
    @ManyToOne(type => User, user => user.comments) user: User
}
