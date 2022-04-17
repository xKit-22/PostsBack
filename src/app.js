"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var typeorm_1 = require("typeorm");
var postMethods_1 = require("./entityesMethods/postMethods");
var commentMethods_1 = require("./entityesMethods/commentMethods");
var userMethods_1 = require("./entityesMethods/userMethods");
var auth_1 = require("./authorization/auth");
require("dotenv").config();
(0, typeorm_1.createConnection)().then(function (connection) {
    // create and setup express app
    var app = express();
    app.use(express.json());
    app.use("/posts", (0, postMethods_1.default)());
    app.use("/comments", (0, commentMethods_1.default)());
    app.use("/users", userMethods_1.default);
    app.use("/api/auth", auth_1.default);
    app.listen(3000, function () { return console.log("start"); });
});
