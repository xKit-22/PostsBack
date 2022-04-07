import 'dotenv/config'
import {User} from "../entity/User";
import {Request, Response} from "express";
import {createConnection} from "typeorm";
import {Post} from "../entity/Post";
import {Comment} from "../entity/Comment";

import jwt from 'jsonwebtoken';
const config = process.env.JWT_KEY

export default (req: Request, res: Response, next) => {

    createConnection().then(connection => {

        const userRepository = connection.getRepository(User)
        const postRepository = connection.getRepository(Post)
        const commentRepository = connection.getRepository(Comment)

        const token = req.headers["x-access-token"]

        if(!token) {
            res.status(500).json({
                success: false,
                message: "No token"
            })
        }

        jwt.verify (token, config, async (err, decoded) => {

            if(err){
                res.status(500).json({
                    success: false,
                    message: "Token is invalid"
                })
            }

            req.body.id = await decoded.id;

            const post = await postRepository.findOneBy({
                id: +req.params.id
            })

            const comment = await postRepository.findOneBy({
                id: +req.params.id
            })

            const user = await userRepository.findOneBy({
                id: decoded.id
            })

            if (post) {
                if (!(user.id == post.authorId)) {
                    res.status(500).json({
                        success: false,
                        message: "No rights for this action"
                    })
                }else {
                    next()
                }
            }

            if (comment) {
                if (!(user.id == comment.authorId)) {
                    res.status(500).json({
                        success: false,
                        message: "No rights for this action"
                    })
                }else {
                    next()
                }
            }
        })
    })
}




