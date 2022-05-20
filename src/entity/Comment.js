"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
var typeorm_1 = require("typeorm");
var Post_1 = require("./Post");
var User_1 = require("./User");
var shortid = require('shortid');
var Comment = /** @class */ (function () {
    function Comment() {
    }
    Comment.prototype.setId = function () {
        this.id = shortid.generate();
    };
    __decorate([
        (0, typeorm_1.PrimaryColumn)("varchar", {
            length: 20
        }),
        __metadata("design:type", String)
    ], Comment.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Comment.prototype, "setId", null);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Comment.prototype, "postId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Comment.prototype, "text", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Comment.prototype, "likesAmount", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Comment.prototype, "authorId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Comment.prototype, "dateOfCreation", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return Post_1.Post; }, function (post) { return post.comments; }, {
            onDelete: "CASCADE"
        }),
        __metadata("design:type", Post_1.Post)
    ], Comment.prototype, "post", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return User_1.User; }, function (user) { return user.comments; }),
        __metadata("design:type", User_1.User)
    ], Comment.prototype, "user", void 0);
    Comment = __decorate([
        (0, typeorm_1.Entity)()
    ], Comment);
    return Comment;
}());
exports.Comment = Comment;
