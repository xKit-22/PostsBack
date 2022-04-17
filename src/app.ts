import * as express from "express";
import {createConnection} from "typeorm";
import postRouter from "./entityesMethods/postMethods";
import commentRouter from "./entityesMethods/commentMethods";
import userRouter from "./entityesMethods/userMethods";
import authRouter from "./authorization/auth";

require("dotenv").config()

createConnection().then(connection => {
    // create and setup express app
    const app = express()
    app.use(express.json())


    app.use("/posts", postRouter())
    app.use("/comments", commentRouter())
    app.use("/users", userRouter)
    app.use("/api/auth", authRouter)


    app.listen(3000, () => console.log("start"))
})








