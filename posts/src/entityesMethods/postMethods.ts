import * as express from "express";
import {Request, Response} from "express";
import {createConnection} from "typeorm";
import {Post} from "../entity/Post";

const postRouter = express.Router();

createConnection().then(connection => {
    const postRepository = connection.getRepository(Post)

    // here we will have logic to return all posts
    postRouter.get("/", async function(req: Request, res: Response) {
        const posts = await postRepository.find()
        return res.json(posts)
    });

    // here we will have logic to return post by id
    postRouter.get("/:id", async function(req: Request, res: Response) {
        const results = await postRepository.findOneBy({
            id: +req.params.id
        })
        return res.send(results)
    });

    // here we will have logic to create and save a post
    postRouter.post("/", async function(req: Request, res: Response) {
        const post = await postRepository.create(req.body)
        const results = await postRepository.save(post)
        return res.send(results)
    });

    // here we will have logic to update a post by a given post id
    postRouter.put("/:id", async function(req: Request, res: Response) {
        const post = await postRepository.findOneBy({
            id: +req.params.id
        })
        postRepository.merge(post, req.body)
        const results = await postRepository.save(post)
        return res.send(results)
    });

    // here we will have logic to delete a post by a given post id
    postRouter.delete("/:id", async function(req: Request, res: Response) {
        const results = await postRepository.delete(req.params.id)
        return res.send(results)
    });

    // here we will have logic to return user`s posts by user id
    postRouter.get("/author/:authorId", async function(req: Request, res: Response) {

        const results = await postRepository.findBy({
            authorId: +req.params.authorId
        })
        return res.send(results)
    });

    // +like
    postRouter.get("/:id/like", async function(req: Request, res: Response){
        const post = await postRepository.findOneBy({
            id: +req.params.id
        })
        const likedPost = post.likesAmount++
        // @ts-ignore
        postRepository.merge(post, likedPost)
        const results = await postRepository.save(post)
        return res.send(results)
    })

    // -like
    postRouter.get("/:id/unlike", async function(req: Request, res: Response){
        const post = await postRepository.findOneBy({
            id: +req.params.id
        })
        const likedPost = post.likesAmount--
        // @ts-ignore
        postRepository.merge(post, likedPost)
        const results = await postRepository.save(post)
        return res.send(results)
    })
})

export default postRouter;


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
