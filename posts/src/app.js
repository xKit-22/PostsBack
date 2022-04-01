"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var postMethods_1 = require("./entityesMethods/postMethods");
// create and setup express app
var app = express();
app.use(express.json());
app.use("/posts", postMethods_1.default);
app.listen(3000, function () { return console.log("start"); });
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
