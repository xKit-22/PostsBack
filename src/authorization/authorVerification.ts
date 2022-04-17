import {User} from "../entity/User";
import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {Post} from "../entity/Post";
import {Comment} from "../entity/Comment";
require('dotenv').config()
//import 'dotenv/config'

const jwt = require('jsonwebtoken');
const configKey = process.env.JWT_KEY

const secret = 'secret'


export default (req: Request, res: Response, next) => {

        const userRepository = getRepository(User)
        const postRepository = getRepository(Post)
        const commentRepository = getRepository(Comment)

        const token = req.headers["x-access-token"]

        if(!token) {
            return res.status(500).json({
                success: false,
                message: "No token"
            })
        }

        jwt.verify(token, secret, async (err, decoded) => {  //configKey

            if(err){
                return res.status(500).json({
                    success: false,
                    message: "Token is invalid / " + err
                })
            }

            req.body.id = await decoded.id;

            const post = await postRepository.findOneBy({
                id: +req.params.id
            })

            const comment = await commentRepository.findOneBy({
                id: +req.params.id
            })

            const user = await userRepository.findOneBy({
                id: decoded.id
            })

            const userFromParams = await userRepository.findOneBy({
                id: +req.params.id
            })

            if (userFromParams) {
                if (!(userFromParams.id == user.id)) {
                    return res.status(500).json({
                        success: false,
                        message: "No rights for this action"
                    })
                }else {
                    next()
                }
            } else if (post) {
                if (!(user.id == post.authorId)) {
                    return res.status(500).json({
                        success: false,
                        message: "No rights for this action"
                    })
                }else {
                    next()
                }
            } else if (comment) {
                if (!(user.id == comment.authorId)) {
                    return res.status(500).json({
                        success: false,
                        message: "No rights for this action"
                    })
                }else {
                    next()
                }
            } else {
                next()
            }
        })
}




