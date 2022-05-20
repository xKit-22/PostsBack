import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, BeforeInsert} from "typeorm";
import {Post} from "./Post";
import {User} from "./User";

const shortid = require('shortid');

@Entity()
export class Comment {
    @PrimaryColumn("varchar", {
        length: 20
    })
    id: string;

    @BeforeInsert()
    setId() {
        this.id = shortid.generate();
    }

    @Column()
    postId: string

    @Column()
    text:string

    @Column()
    likesAmount: number

    @Column()
    authorId: string

    @Column()
    dateOfCreation: string

    @ManyToOne(type => Post, post => post.comments, {
        onDelete: "CASCADE"
    }) post: Post

    @ManyToOne(type => User, user => user.comments) user: User
}
