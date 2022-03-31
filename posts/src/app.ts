import * as express from "express";
import {Request, Response} from "express";
import {createConnection} from "typeorm";
import {Post} from "./entity/Post";

createConnection().then(connection => {
    const postRepository = connection.getRepository(Post)

    // create and setup express app
    const app = express()
    app.use(express.json())

    app.get("/posts", async function(req: Request, res: Response) {
        // here we will have logic to return all posts
        const posts = await postRepository.find()
        return res.json(posts)
    });

    app.get("/posts/:id", async function(req: Request, res: Response) {
        // here we will have logic to return post by id
        const results = await postRepository.findOneBy({
            id: +req.params.id
        })
        return res.send(results)
    });

    app.post("/posts", async function(req: Request, res: Response) {
        // here we will have logic to create and save a post
        const post = await postRepository.create(req.body)
        const results = await postRepository.save(post)
        return res.send(results)
    });

    app.put("/posts/:id", async function(req: Request, res: Response) {
        // here we will have logic to update a post by a given post id
        const post = await postRepository.findOneBy({
            id: +req.params.id
        })
        postRepository.merge(post, req.body)
        const results = await postRepository.save(post)
        return res.send(results)
    });

    app.delete("/posts/:id", async function(req: Request, res: Response) {
        // here we will have logic to delete a post by a given post id
        const results = await postRepository.delete(req.params.id)
        return res.send(results)
    });

    app.get("/posts/author/:authorId", async function(req: Request, res: Response) {
        // here we will have logic to return user`s posts by user id
        const results = await postRepository.findOneBy({
            authorId: +req.params.authorId
        })
        return res.send(results)
    });

    app.get("/posts/:id/like", async function(req: Request, res: Response){
        // +like
        const post = await postRepository.findOneBy({
            id: +req.params.id
        })
        const likedPost = post.likesAmount++
        console.log(likedPost)
        // @ts-ignore
        postRepository.merge(post, likedPost)
        const results = await postRepository.save(post)
        return res.send(results)
    })

    app.get("/posts/:id/unlike", async function(req: Request, res: Response){
        // -like
        const post = await postRepository.findOneBy({
            id: +req.params.id
        })
        const likedPost = post.likesAmount--
        console.log(likedPost)
        // @ts-ignore
        postRepository.merge(post, likedPost)
        const results = await postRepository.save(post)
        return res.send(results)
    })

    app.listen(3000, () => console.log("start"))
})


/*
fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, *!/!*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"text":"text", "picture":"picture", "likesAmount":10, "authorId":"12", "dateOfCreation":"12.03.22"})
}).then(res => res.json())
    .then(res => console.log(res));
*/
