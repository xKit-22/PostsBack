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
exports.Subscription = void 0;
var typeorm_1 = require("typeorm");
var shortid = require('shortid');
var Subscription = /** @class */ (function () {
    function Subscription() {
    }
    Subscription.prototype.setId = function () {
        this.id = shortid.generate();
    };
    __decorate([
        (0, typeorm_1.PrimaryColumn)("varchar", {
            length: 20
        }),
        __metadata("design:type", String)
    ], Subscription.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Subscription.prototype, "setId", null);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Subscription.prototype, "subscriberId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Subscription.prototype, "whoAreSubscribedToId", void 0);
    Subscription = __decorate([
        (0, typeorm_1.Entity)()
    ], Subscription);
    return Subscription;
}());
exports.Subscription = Subscription;
