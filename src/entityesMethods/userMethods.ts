import * as express from "express";
import {Request, Response} from "express";
import {createConnection, getRepository} from "typeorm";
import {User} from "../entity/User";
import {Post} from "../entity/Post";
import authorVerification from "../authorization/authorVerification";
const bcrypt = require('bcryptjs');

const userRouter = express.Router();

    let userRepository

    //logic to return all users
    userRouter.get("/", async function(req: Request, res: Response) {
        const users = await userRepository.find()
        return res.json(users)
    })

    //logic to return user by id
    userRouter.get("/:id", async function(req: Request, res: Response) {
        const results = await userRepository.findOneBy({
            id: req.params.id
        })
        return res.send(results)
    });

    //logic to create and save a user
    userRouter.post("/", async function(req: Request, res: Response) { //verification
        const user = await userRepository.create(req.body)
        const results = await userRepository.save(user)
        return res.send(results)
    });

    // logic to update a user by a given user id
    userRouter.put("/:id", authorVerification, async function(req: Request, res: Response) {
        const user = await userRepository.findOneBy({
            id: req.params.id
        })
        userRepository.merge(user, req.body)
        const results = await userRepository.save(user)
        return res.send(results)
    });

    //logic to delete a user by a given user id
    userRouter.delete("/:id", authorVerification, async function(req: Request, res: Response) {
        const results = await userRepository.delete(req.params.id)
        return res.send(results)
    });

    //logic to change a user`s password by a given user id
    userRouter.put("/:id/changePassword", authorVerification,async function(req: Request, res: Response){
        const user = await userRepository.findOneBy({
            id: req.params.id
        })
        const salt = bcrypt.genSaltSync(10)
        const currentPassword = user.userPassword
        const newPassword = req.body.userPassword
        const passwordResult = bcrypt.compareSync(newPassword, currentPassword)

        if (!passwordResult)
        {
            user.userPassword = bcrypt.hashSync(newPassword, salt)
            const changePassword = user.userPassword
            userRepository.merge(user, changePassword)
            const results = await userRepository.save(user)
            return res.send(results)
        } else {
            res.status(500).json({                      //Нормальный статус код не придумала
                success: false,
                message: 'Enter a password different from the old one'
            })
        }
    })

    // to subscribe
    userRouter.get("/:id/subscribe", async function(req: Request, res: Response){ //verification
        const user = await userRepository.findOneBy({
            id: req.params.id
        })
        const changeSubscriber = user.subscribersAmount++
        userRepository.merge(user, changeSubscriber)
        const results = await userRepository.save(user)
        return res.send(results)
    })

    // to unsubscribe
    userRouter.get("/:id/unsubscribe", async function(req: Request, res: Response){ //verification
        const user = await userRepository.findOneBy({
            id: req.params.id
        })
        const changeSubscriber = user.subscribersAmount++
        userRepository.merge(user, changeSubscriber)
        const results = await userRepository.save(user)
        return res.send(results)
    })

    // +subscriber
    userRouter.get("/:id/addSubscriber", authorVerification, async function(req: Request, res: Response){
        const user = await userRepository.findOneBy({
            id: req.params.id
        })
        const changeSubscriber = user.subscribersAmount++
        userRepository.merge(user, changeSubscriber)
        const results = await userRepository.save(user)
        return res.send(results)
    })

    // -subscriber
    userRouter.get("/:id/removeSubscriber",authorVerification, async function(req: Request, res: Response){
        const user = await userRepository.findOneBy({
            id: req.params.id
        })
        const changeSubscriber = user.subscribersAmount--
        userRepository.merge(user, changeSubscriber)
        const results = await userRepository.save(user)
        return res.send(results)
    })

    // +subscription
    userRouter.get("/:id/addSubscription", authorVerification, async function(req: Request, res: Response){
        const user = await userRepository.findOneBy({
            id: req.params.id
        })
        const changeSubscription = user.subscriptionsAmount++
        userRepository.merge(user, changeSubscription)
        const results = await userRepository.save(user)
        return res.send(results)
    })

    // -subscription
    userRouter.get("/:id/removeSubscription", authorVerification, async function(req: Request, res: Response){
        const user = await userRepository.findOneBy({
            id: req.params.id
        })
        const changeSubscription = user.subscriptionsAmount--
        userRepository.merge(user, changeSubscription)
        const results = await userRepository.save(user)
        return res.send(results)
    })

    // +post
    userRouter.get("/:id/addPost", authorVerification, async function(req: Request, res: Response){
        const user = await userRepository.findOneBy({
            id: req.params.id
        })
        const changePostsAmount = user.postsAmount++
        userRepository.merge(user, changePostsAmount)
        const results = await userRepository.save(user)
        return res.send(results)
    })

    // -post
    userRouter.get("/:id/removePost", authorVerification, async function(req: Request, res: Response){
        const user = await userRepository.findOneBy({
            id: req.params.id
        })
        const changePostsAmount = user.postsAmount--
        userRepository.merge(user, changePostsAmount)
        const results = await userRepository.save(user)
        return res.send(results)
    })

export default () => {
    userRepository = getRepository(User);
    return userRouter;
}



/*fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, *!/!*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"nickname":"nickname1", "avatar":"avatar1", "postsAmount":10, "subscribersAmount":12,
        "subscriptionsAmount":25, "allLikesAmount": 25, "dateOfCreation": "22.08.2015", "userLogin": "userLogin1", "userPassword": "userPassword1"})
}).then(res => res.json())
    .then(res => console.log(res));*/

/*fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, *!/!*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"nickname":"nickname1", "avatar":"avatar1", "userLogin": "userLogin1", "userPassword": "userPassword1"})
}).then(res => res.json())
    .then(res => console.log(res));*/

/*fetch('http://localhost:3000/users/1', {
    method: 'PUT',
    headers: {
        'Accept': 'application/json, text/plain, *!/!*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"nickname":"nickname1UPD", "avatar":"avatar1UPD", "postsAmount":10, "subscribersAmount":12,
        "subscriptionsAmount":25, "allLikesAmount": 25, "dateOfCreation": "22.08.2015", "userLogin": "userLogin1UPD", "userPassword": "userPassword1UPD"})
}).then(res => res.json())
    .then(res => console.log(res));*/

//Password change test

/*fetch('http://localhost:3000/users/1/changePassword', {
    method: 'PUT',
    headers: {
        'Accept': 'application/json, text/plain, *!/!*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"userPassword": "changePassword"})
}).then(res => res.json())
    .then(res => console.log(res));*/

/*fetch('http://localhost:3000/users/2', {
    method: 'DELETE'
}).then(res => res.json())
    .then(res => console.log(res))*/
