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






