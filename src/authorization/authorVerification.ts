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


createConnection().then(connection => {

    const userRepository = connection.getRepository(User)
    const postRepository = connection.getRepository(Post)

     const  verifyToken = (req: Request, res: Response, next) => {
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
                    message: "Token is invalid / " + err
                })
            }

            req.body.id = await decoded.id;

            const post = await postRepository.findOneBy({
               authorId: +req.params.authorId
            })

            const comment = await commentRepository.findOneBy({
                id: +req.params.id
            })

            const user = await userRepository.findOneBy({
               id: decoded.id
            })

            if (post) {
                if (!(user.id == post.authorId)) {
                    return res.status(500).json({
                        success: false,
                        message: "No rights for this action"
                    })
                }else {
                    next()
                }
            }

            if (comment) {
                if (!(user.id == comment.authorId)) {
                    return res.status(500).json({
                        success: false,
                        message: "No rights for this action"
                    })
                }else {
                    next()
                }
            }
        })
    }
})


