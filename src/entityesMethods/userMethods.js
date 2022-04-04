"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var userRouter = express.Router();
(0, typeorm_1.createConnection)().then(function (connection) {
    var userRepository = connection.getRepository(User_1.User);
    //logic to return all users
    userRouter.get("/", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.find()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, res.json(users)];
                }
            });
        });
    });
    //logic to return user by id
    userRouter.get("/:id", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOneBy({
                            id: +req.params.id
                        })];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    //logic to create and save a user
    userRouter.post("/", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.create(req.body)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    // logic to update a user by a given user id
    userRouter.put("/:id", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOneBy({
                            id: +req.params.id
                        })];
                    case 1:
                        user = _a.sent();
                        userRepository.merge(user, req.body);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    //logic to delete a user by a given user id
    userRouter.delete("/:id", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.delete(req.params.id)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    // +subscriber
    userRouter.get("/:id/addSubscriber", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, changeSubscriber, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOneBy({
                            id: +req.params.id
                        })];
                    case 1:
                        user = _a.sent();
                        changeSubscriber = user.subscribersAmount++;
                        // @ts-ignore
                        userRepository.merge(user, changeSubscriber);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    // -subscriber
    userRouter.get("/:id/removeSubscriber", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, changeSubscriber, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOneBy({
                            id: +req.params.id
                        })];
                    case 1:
                        user = _a.sent();
                        changeSubscriber = user.subscribersAmount--;
                        // @ts-ignore
                        userRepository.merge(user, changeSubscriber);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    // +subscription
    userRouter.get("/:id/addSubscription", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, changeSubscription, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOneBy({
                            id: +req.params.id
                        })];
                    case 1:
                        user = _a.sent();
                        changeSubscription = user.subscriptionsAmount++;
                        // @ts-ignore
                        userRepository.merge(user, changeSubscription);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    // -subscription
    userRouter.get("/:id/removeSubscription", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, changeSubscription, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOneBy({
                            id: +req.params.id
                        })];
                    case 1:
                        user = _a.sent();
                        changeSubscription = user.subscriptionsAmount--;
                        // @ts-ignore
                        userRepository.merge(user, changeSubscription);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    // +post
    userRouter.get("/:id/addPost", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, changePostsAmount, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOneBy({
                            id: +req.params.id
                        })];
                    case 1:
                        user = _a.sent();
                        changePostsAmount = user.postsAmount++;
                        // @ts-ignore
                        userRepository.merge(user, changePostsAmount);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    // -post
    userRouter.get("/:id/removePost", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, changePostsAmount, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOneBy({
                            id: +req.params.id
                        })];
                    case 1:
                        user = _a.sent();
                        changePostsAmount = user.postsAmount--;
                        // @ts-ignore
                        userRepository.merge(user, changePostsAmount);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
});
exports.default = userRouter;
/*fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, *!/!*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"nickname":"nickname1", "avatar":"avatar1", "postsAmount":10, "subscribersAmount":12,
        "subscriptionsAmount":25, "allLikesAmount": 25, "dateOfCreation": "22.08.2015", "userLogin": "userLogin1", "userPassword": "userPassword1"})
}).then(res => res.json())
    .then(res => console.log(res));*/
/*fetch('http://localhost:3000/users/1', {
    method: 'PUT',
    headers: {
        'Accept': 'application/json, text/plain, *!/!*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"nickname":"nickname1UPD", "avatar":"avatar1UPD", "postsAmount":10, "subscribersAmount":12,
        "subscriptionsAmount":25, "allLikesAmount": 25, "dateOfCreation": "22.08.2015", "userLogin": "userLogin1UPD", "userPassword": "userPassword1UPD"})
}).then(res => res.json())
    .then(res => console.log(res));*/
/*fetch('http://localhost:3000/users/2', {
    method: 'DELETE'
}).then(res => res.json())
    .then(res => console.log(res))*/