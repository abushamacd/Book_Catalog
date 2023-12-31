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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.updateUserService = exports.getUserService = exports.getUsersService = void 0;
const prisma_1 = __importDefault(require("../../../utilities/prisma"));
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = require("../../../errorFormating/apiError");
const auth_constants_1 = require("../auth/auth.constants");
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({ select: auth_constants_1.returnUser });
    if (!result) {
        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Users retrieved failed');
    }
    return result;
});
exports.getUsersService = getUsersService;
const getUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
        select: auth_constants_1.returnUser,
    });
    if (!result) {
        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'User retrieved failed');
    }
    return result;
});
exports.getUserService = getUserService;
const updateUserService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, password } = payload, others = __rest(payload, ["role", "password"]);
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: others,
        select: auth_constants_1.returnUser,
    });
    if (!result) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'User update failed');
    }
    return result;
});
exports.updateUserService = updateUserService;
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.delete({
        where: {
            id,
        },
        select: auth_constants_1.returnUser,
    });
    if (!result) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'User deleted failed');
    }
    return result;
});
exports.deleteUserService = deleteUserService;
