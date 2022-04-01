import * as express from "express";
import {Request, Response} from "express";
import {createConnection} from "typeorm";
import {Comment} from "../entity/Comment";

const  commentRouter = express.Router();

createConnection().then(connection => {
    const commentRepository = connection.getRepository(Comment)

    //logic to return all comments
    commentRouter.get("/", async function(req: Request, res: Response) {
        const comments = await commentRepository.find()
        return res.json(comments)
    })

    //logic to return comment by id
    commentRouter.get("/:id", async function(req: Request, res: Response) {
        const results = await commentRepository.findOneBy({
            id: +req.params.id
        })
        return res.send(results)
    });

    //logic to create and save a comment
    commentRouter.post("/", async function(req: Request, res: Response) {
        const comment = await commentRepository.create(req.body)
        const results = await commentRepository.save(comment)
        return res.send(results)
    });

    // logic to update a comment by a given comment id
    commentRouter.put("/:id", async function(req: Request, res: Response) {
        const comment = await commentRepository.findOneBy({
            id: +req.params.id
        })
        commentRepository.merge(comment, req.body)
        const results = await commentRepository.save(comment)
        return res.send(results)
    });

    //logic to delete a comment by a given comment id
    commentRouter.delete("/:id", async function(req: Request, res: Response) {
        const results = await commentRepository.delete(req.params.id)
        return res.send(results)
    });

    //logic to return user`s comments by user id
    commentRouter.get("/author/:authorId", async function(req: Request, res: Response) {

        const results = await commentRepository.findOneBy({
            authorId: +req.params.authorId
        })
        return res.send(results)
    });

    // +like
    commentRouter.get("/:id/like", async function(req: Request, res: Response){
        const comment = await commentRepository.findOneBy({
            id: +req.params.id
        })
        const likedComment = comment.likesAmount++
        // @ts-ignore
        commentRepository.merge(comment, likedComment)
        const results = await commentRepository.save(comment)
        return res.send(results)
    })

    // -like
    commentRouter.get("/:id/unlike", async function(req: Request, res: Response){
        const comment = await commentRepository.findOneBy({
            id: +req.params.id
        })
        const likedComment = comment.likesAmount--
        // @ts-ignore
        commentRepository.merge(comment, likedComment)
        const results = await commentRepository.save(comment)
        return res.send(results)
    })

})

export default commentRouter;


