import * as express from "express";
import {Request, Response} from "express";
import {createConnection, getRepository} from "typeorm";
import {User} from "../entity/User";
//import 'dotenv/config'
import {Comment} from "../entity/Comment";

require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const authRouter = express.Router();


const secret = 'secret'

    let userRepository

    authRouter.post("/login",  async function(req: Request, res: Response) {
        const candidate = await userRepository.findOneBy({
            userLogin: req.body.userLogin
        })

        if (candidate) {
            //Password check, user exist
            const passwordResult = bcrypt.compareSync(req.body.userPassword, candidate.userPassword)

            if (passwordResult) {
                //Passwords matched, generate token
                const token = jwt.sign({
                    userLogin: candidate.userLogin,
                    id: candidate.id
                }, secret , {expiresIn: '1h'}) //process.env.JWT_KEY

                res.status(200).json({
                    token: `Bearer ${token}`
                })
            } else {
                res.status(401).json({
                    message: "Passwords didn't match"
                })
            }
        } else {
            //User not found
            res.status(404).json({
                message: "User with this login not found"
            })
        }

    })

    //logic to registration of user
    authRouter.post('/register', async function (req: Request, res: Response) {
        const candidate = await userRepository.findOneBy({
            userLogin: req.body.userLogin
        })

        if (candidate) {
            // Error: User exist
            res.status(409).json({
                    message: 'User with this login already exists'
                })
        } else {
            //Create user
            const salt = bcrypt.genSaltSync(10)
            const password = req.body.userPassword
            const user = await userRepository.create({
                nickname: req.body.nickname,
                avatar: 'req.body.avatar',
                postsAmount: 0,
                subscribersAmount: 0,
                subscriptionsAmount: 0,
                allLikesAmount: 0,
                dateOfCreation: new Date().toISOString().split('T')[0],
                userLogin: req.body.userLogin,
                userPassword: bcrypt.hashSync(password, salt)
            })
            try {
                const results = await userRepository.save(user)
                res.status(201).json(results)
                return res.send(results)
            } catch (e){
                res.status(500).json({
                    success: false,
                    message: e.message ? e.message : e
                })
            }
        }
    })


export default () => {
    userRepository = getRepository(User);
    return authRouter;
}


//      http://localhost:3000/api/auth/login