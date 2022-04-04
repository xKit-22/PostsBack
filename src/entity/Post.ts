import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

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
}