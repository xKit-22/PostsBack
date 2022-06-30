import {BeforeInsert, Column, Entity, PrimaryColumn} from "typeorm";

const shortid = require('shortid');

@Entity()
export class Subscription {

    @PrimaryColumn("varchar", {
        length: 20
    })
    id: string;

    @BeforeInsert()
    setId() {
        this.id = shortid.generate();
    }

    @Column()
    subscriberId: string

    @Column()
    whoAreSubscribedToId: string

}