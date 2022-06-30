import * as express from "express";
import {Request, Response} from "express";
import {createConnection, getRepository, In} from "typeorm";
import {Post} from "../entity/Post";
import authorVerification from "../authorization/authorVerification";
import {Comment} from "../entity/Comment";
import {Subscription} from "../entity/Subscription";

const postRouter = express.Router();

let postRepository;
let subscriptionRepository

//logic to return posts by subscriptions
    postRouter.get("/feed", authorVerification, async function(req: Request, res: Response) {
        console.log( 111)

        const subscriptions = await subscriptionRepository.findBy({
            subscriberId: req.body.currentUserId
        })
        console.log(subscriptions, 111)
        const subscriptionsId = subscriptions.map((subscription => subscription.whoAreSubscribedToId))
        console.log(subscriptionsId)
        const posts = await postRepository.find({
            where: { authorId: In(subscriptionsId) },
            order: { dateOfCreation: "DESC" },
        });
        return res.send(posts)
    });

    // logic to return all posts
    postRouter.get("/", async function(req: Request, res: Response) {
        const posts = await postRepository.find()
        return res.json(posts)
    });

    // logic to return post by id
    postRouter.get("/:id", async function(req: Request, res: Response) {
        const results = await postRepository.findOneBy({
            id: req.params.id
        })
        return res.send(results)
    });

    // logic to create and save a post
    postRouter.post("/", async function(req: Request, res: Response) {  //verification
        const post = await postRepository.create(req.body)
        const results = await postRepository.save(post)
        return res.send(results)
    });

    // logic to update a post by a given post id
    postRouter.put("/:id", authorVerification, async function(req: Request, res: Response) {
        const post = await postRepository.findOneBy({
            id: req.params.id
        })
        postRepository.merge(post, req.body)
        const results = await postRepository.save(post)
        return res.send(results)
    });

    // logic to delete a post by a given post id
    postRouter.delete("/:id", authorVerification, async function(req: Request, res: Response) {
        const results = await postRepository.delete(req.params.id)
        return res.send(results)
    });

    // logic to return user`s posts by user id
    postRouter.get("/author/:authorId", async function(req: Request, res: Response) {
        const results = await postRepository.findBy({
            authorId: req.params.authorId
        })
        return res.send(results)
    });


    // +like
    postRouter.get("/:id/like", authorVerification, async function(req: Request, res: Response){
        const post = await postRepository.findOneBy({
            id: req.params.id
        })
        const likedPost = post.likesAmount++
        postRepository.merge(post, likedPost)
        const results = await postRepository.save(post)
        return res.send(results)
    })

    // -like
    postRouter.get("/:id/unlike", authorVerification, async function(req: Request, res: Response){
        const post = await postRepository.findOneBy({
            id: req.params.id
        })
        const likedPost = post.likesAmount--
        postRepository.merge(post, likedPost)
        const results = await postRepository.save(post)
        return res.send(results)
    })

export default () => {
    postRepository = getRepository(Post);
    subscriptionRepository = getRepository(Subscription)
    return postRouter;
}

/*
fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, *!/!*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"text":"text", "picture":"picture", "likesAmount":10, "authorId":12, "dateOfCreation":"12.03.22"})
}).then(res => res.json())
    .then(res => console.log(res));
*/

/*fetch('http://localhost:3000/posts/2', {
    method: 'PUT',
    headers: {
        'Accept': 'application/json, text/plain, *!/!*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"text":"textUPD", "picture":"pictureUPD", "likesAmount":12, "authorId":14, "dateOfCreation":"15.02.22"})
}).then(res => res.json())
    .then(res => console.log(res));*/

/*fetch('http://localhost:3000/posts/2', {
    method: 'DELETE'
}).then(res => res.json())
    .then(res => console.log(res))*/

