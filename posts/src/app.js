"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var postMethods_1 = require("./entityesMethods/postMethods");
var commentMethods_1 = require("./entityesMethods/commentMethods");
var userMethods_1 = require("./entityesMethods/userMethods");
// create and setup express app
var app = express();
app.use(express.json());
app.use("/posts", postMethods_1.default);
app.use("/comments", commentMethods_1.default);
app.use("/users", userMethods_1.default);
app.listen(3000, function () { return console.log("start"); });
