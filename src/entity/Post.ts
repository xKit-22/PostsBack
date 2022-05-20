import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, PrimaryColumn, BeforeInsert} from "typeorm";
import {User} from "./User";
import {Comment} from "./Comment";

const shortid = require('shortid');

@Entity()
export class Post{
    @PrimaryColumn("varchar", {
        length: 20
    })
    id: string;

    @BeforeInsert()
    setId() {
        this.id = shortid.generate();
    }

    @Column()
    text: string

    @Column()
    picture: string

    @Column()
    likesAmount: number

    @Column()
    authorId: string

    @Column()
    dateOfCreation: string

    @ManyToOne(type => User, user => user.posts) user: User
    @OneToMany(type => Comment, comment => comment.post) comments: Post[]
}