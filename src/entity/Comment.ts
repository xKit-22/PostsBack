import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    text:string

    @Column()
    likesAmount: number

    @Column()
    authorId: number

    @Column()
    dateOfCreation: string
}
