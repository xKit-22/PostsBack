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
exports.Post = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Comment_1 = require("./Comment");
var Post = /** @class */ (function () {
    function Post() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Post.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Post.prototype, "text", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Post.prototype, "picture", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Post.prototype, "likesAmount", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Post.prototype, "authorId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Post.prototype, "dateOfCreation", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return User_1.User; }, function (user) { return user.posts; }),
        __metadata("design:type", User_1.User)
    ], Post.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (type) { return Comment_1.Comment; }, function (comment) { return comment.post; }),
        __metadata("design:type", Array)
    ], Post.prototype, "comments", void 0);
    Post = __decorate([
        (0, typeorm_1.Entity)()
    ], Post);
    return Post;
}());
exports.Post = Post;
