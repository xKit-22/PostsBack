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
exports.User = void 0;
var typeorm_1 = require("typeorm");
var Post_1 = require("./Post");
var Comment_1 = require("./Comment");
var shortid = require('shortid');
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.setId = function () {
        this.id = shortid.generate();
    };
    __decorate([
        (0, typeorm_1.PrimaryColumn)("varchar", {
            length: 20
        }),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], User.prototype, "setId", null);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "nickname", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "avatar", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], User.prototype, "postsAmount", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], User.prototype, "subscribersAmount", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], User.prototype, "subscriptionsAmount", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], User.prototype, "allLikesAmount", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "dateOfCreation", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "userLogin", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "userPassword", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (type) { return Post_1.Post; }, function (post) { return post.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "posts", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (type) { return Comment_1.Comment; }, function (comment) { return comment.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "comments", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)('users')
    ], User);
    return User;
}());
exports.User = User;
