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
require("dotenv/config");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var authRouter = express.Router();
var jwtKey = 'dev-jwt';
(0, typeorm_1.createConnection)().then(function (connection) {
    var userRepository = connection.getRepository(User_1.User);
    authRouter.post("/login", function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var candidate, passwordResult, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOneBy({
                            userLogin: req.body.userLogin
                        })];
                    case 1:
                        candidate = _a.sent();
                        if (candidate) {
                            passwordResult = bcrypt.compareSync(req.body.userPassword, candidate.userPassword);
                            if (passwordResult) {
                                token = jwt.sign({
                                    userLogin: candidate.userLogin,
                                    id: candidate.id
                                }, process.env.JWT_KEY, { expiresIn: '1h' });
                                res.status(200).json({
                                    token: "Bearer ".concat(token)
                                });
                            }
                            else {
                                res.status(401).json({
                                    message: "Passwords didn't match"
                                });
                            }
                        }
                        else {
                            //User not found
                            res.status(404).json({
                                message: "User with this login not found"
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
    //logic to registration of user
    authRouter.post('/register', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var candidate, salt, password, user, results, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOneBy({
                            userLogin: req.body.userLogin
                        })];
                    case 1:
                        candidate = _a.sent();
                        if (!candidate) return [3 /*break*/, 2];
                        // Error: User exist
                        res.status(409).json({
                            message: 'User with this login already exists'
                        });
                        return [3 /*break*/, 7];
                    case 2:
                        salt = bcrypt.genSaltSync(10);
                        password = req.body.userPassword;
                        return [4 /*yield*/, userRepository.create({
                                nickname: req.body.nickname,
                                avatar: req.body.avatar,
                                postsAmount: 0,
                                subscribersAmount: 0,
                                subscriptionsAmount: 0,
                                allLikesAmount: 0,
                                dateOfCreation: new Date().toISOString().split('T')[0],
                                userLogin: req.body.userLogin,
                                userPassword: bcrypt.hashSync(password, salt)
                            })];
                    case 3:
                        user = _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 5:
                        results = _a.sent();
                        res.status(201).json(results);
                        return [2 /*return*/, res.send(results)];
                    case 6:
                        e_1 = _a.sent();
                        res.status(500).json({
                            success: false,
                            message: e_1.message ? e_1.message : e_1
                        });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    });
});
exports.default = authRouter;
