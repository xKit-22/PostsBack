import * as express from "express";
import {Request, Response} from "express";
import {createConnection} from "typeorm";
import {User} from "../entity/User";


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

    // +subscription
    userRouter.get("/:id/addSubscription", async function(req: Request, res: Response){
        const user = await userRepository.findOneBy({
            id: +req.params.id
        })
        const changeSubscription = user.subscriptionsAmount++
        // @ts-ignore
        userRepository.merge(user, changeSubscription)
        const results = await userRepository.save(user)
        return res.send(results)
    })

    // -subscription
    userRouter.get("/:id/removeSubscription", async function(req: Request, res: Response){
        const user = await userRepository.findOneBy({
            id: +req.params.id
        })
        const changeSubscription = user.subscriptionsAmount--
        // @ts-ignore
        userRepository.merge(user, changeSubscription)
        const results = await userRepository.save(user)
        return res.send(results)
    })

    // +post
    userRouter.get("/:id/addPost", async function(req: Request, res: Response){
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
    userRouter.get("/:id/removePost", async function(req: Request, res: Response){
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

/*fetch('http://localhost:3000/users/2', {
    method: 'DELETE'
}).then(res => res.json())
    .then(res => console.log(res))*/
