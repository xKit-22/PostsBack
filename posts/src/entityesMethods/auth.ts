import * as express from "express";
import {Request, Response} from "express";
import {createConnection} from "typeorm";
import {User} from "../entity/User";

const bcrypt = require('bcryptjs');
const authRouter = express.Router();


createConnection().then(connection => {
    const userRepository = connection.getRepository(User)

    authRouter.post("/login",  function(req: Request, res: Response) {

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
                avatar: req.body.avatar,
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
            } catch (e){}

        }
    })
})

export default authRouter