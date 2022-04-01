import * as express from "express";
import postRouter from "./entityesMethods/postMethods";
import commentRouter from "./entityesMethods/commentMethods";
import userRouter from "./entityesMethods/userMethods";


// create and setup express app
const app = express()
app.use(express.json())


app.use("/posts", postRouter)
app.use("/comments", commentRouter)
app.use("/users", userRouter)
app.listen(3000, () => console.log("start"))




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
