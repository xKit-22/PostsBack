import 'dotenv/config'
import {User} from "../entity/User";
import {Request, Response} from "express";
import {createConnection} from "typeorm";
import {Post} from "../entity/Post";
import commentRouter from "../entityesMethods/commentMethods";

const jwt = require('jsonwebtoken')
const config = process.env.JWT_KEY

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
                    message: "Token is invalid"
                })
            }
            req.body.id = await decoded.id;
            const post = await postRepository.findOneBy({
               authorId: +req.params.authorId
            })

            const user = await userRepository.findOneBy({
               id: decoded.id
            })

             if (!(user.id == post.authorId)) {
                 res.status(500).json({
                     success: false,
                     message: "No rights for this action"
                 })
             }else {
                 next()
             }
        })
    }
})


