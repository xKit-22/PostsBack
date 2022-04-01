import * as express from "express";
import {Request, Response} from "express";
import {createConnection} from "typeorm";
import {User} from "../entity/User";
import commentRouter from "./commentMethods";
import postRouter from "./postMethods";

const userRouter = express.Router();

createConnection().then(connection => {
    const userRepository = connection.getRepository(User)

    //logic to return all users
    userRouter.get("/", async function(req: Request, res: Response) {
        const users = await userRepository.find()
        return res.json(users)
    })

    //logic to return user by id
    userRouter.get("/:id", async function(req: Request, res: Response) {
        const results = await userRepository.findOneBy({
            id: +req.params.id
        })
        return res.send(results)
    });

    //logic to create and save a user
    userRouter.post("/", async function(req: Request, res: Response) {
        const user = await userRepository.create(req.body)
        const results = await userRepository.save(user)
        return res.send(results)
    });

    // logic to update a user by a given user id
    userRouter.put("/:id", async function(req: Request, res: Response) {
        const user = await userRepository.findOneBy({
            id: +req.params.id
        })
        userRepository.merge(user, req.body)
        const results = await userRepository.save(user)
        return res.send(results)
    });

    //logic to delete a user by a given user id
    userRouter.delete("/:id", async function(req: Request, res: Response) {
        const results = await userRepository.delete(req.params.id)
        return res.send(results)
    });

    // +subscriber
    userRouter.get("/:id/addSubscriber", async function(req: Request, res: Response){
        const user = await userRepository.findOneBy({
            id: +req.params.id
        })
        const changeSubscriber = user.subscribersAmount++
        // @ts-ignore
        userRepository.merge(user, changeSubscriber)
        const results = await userRepository.save(user)
        return res.send(results)
    })

    // -subscriber
    userRouter.get("/:id/removeSubscriber", async function(req: Request, res: Response){
        const user = await userRepository.findOneBy({
            id: +req.params.id
        })
        const changeSubscriber = user.subscribersAmount--
        // @ts-ignore
        userRepository.merge(user, changeSubscriber)
        const results = await userRepository.save(user)
        return res.send(results)
    })

    // +post
    userRouter.get("/:id/addSubscriber", async function(req: Request, res: Response){
        const user = await userRepository.findOneBy({
            id: +req.params.id
        })
        const changePostsAmount = user.postsAmount++
        // @ts-ignore
        userRepository.merge(user, changePostsAmount)
        const results = await userRepository.save(user)
        return res.send(results)
    })

    // -post
    userRouter.get("/:id/addSubscriber", async function(req: Request, res: Response){
        const user = await userRepository.findOneBy({
            id: +req.params.id
        })
        const changePostsAmount = user.postsAmount--
        // @ts-ignore
        userRepository.merge(user, changePostsAmount)
        const results = await userRepository.save(user)
        return res.send(results)
    })
})

export default userRouter