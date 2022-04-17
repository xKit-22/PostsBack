import * as express from "express";
import {Request, Response} from "express";
import {createConnection, getRepository} from "typeorm";
import {Comment} from "../entity/Comment";
import authorVerification from "../authorization/authorVerification";

const  commentRouter = express.Router();
let commentRepository;

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
    commentRouter.put("/:id", authorVerification, async function(req: Request, res: Response) {
        const comment = await commentRepository.findOneBy({
            id: +req.params.id
        })
        commentRepository.merge(comment, req.body)
        const results = await commentRepository.save(comment)
        return res.send(results)
    });

    //logic to delete a comment by a given comment id
    commentRouter.delete("/:id", authorVerification, async function(req: Request, res: Response) {
        const results = await commentRepository.delete(req.params.id)
        return res.send(results)
    });

    //logic to return user`s comments by user id
    commentRouter.get("/author/:authorId", async function(req: Request, res: Response) {

        const results = await commentRepository.findBy({
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

export default () => {
   commentRepository = getRepository(Comment);
        return commentRouter;
}


/*fetch('http://localhost:3000/comments', {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, *!/!*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"postId": 5, "text":"commentText1", "likesAmount":10, "authorId":12, "dateOfCreation":"12.03.22"})
}).then(res => res.json())
    .then(res => console.log(res));*/

/*fetch('http://localhost:3000/comments/2', {
    method: 'PUT',
    headers: {
        'Accept': 'application/json, text/plain, *!/!*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"postId": 5,  "text":"commentText2UPD", "likesAmount":10, "authorId":12, "dateOfCreation":"12.03.22"})
}).then(res => res.json())
    .then(res => console.log(res))*/

/*fetch('http://localhost:3000/comments/3', {
    method: 'DELETE'
}).then(res => res.json())
    .then(res => console.log(res))*/


