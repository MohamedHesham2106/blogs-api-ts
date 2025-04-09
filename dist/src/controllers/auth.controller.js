"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthController", {
    enumerable: true,
    get: function() {
        return AuthController;
    }
});
const _typedi = require("typedi");
const _authservice = require("../services/auth.service");
const _usersdto = require("../dtos/users.dto");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
let AuthController = class AuthController {
    constructor(){
        _define_property(this, "authService", _typedi.Container.get(_authservice.AuthService));
        _define_property(this, "signUp", async (req, res, next)=>{
            try {
                const userData = (0, _classtransformer.plainToInstance)(_usersdto.CreateUserDto, req.body);
                const validationErrors = await (0, _classvalidator.validate)(userData);
                if (validationErrors.length > 0) {
                    res.status(422).json({
                        errors: validationErrors
                    });
                    return;
                }
                const signUpUserData = await this.authService.signUp(userData);
                res.status(201).json({
                    data: {
                        signUpUserData
                    },
                    message: 'signup successful'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "signIn", async (req, res, next)=>{
            try {
                const userData = (0, _classtransformer.plainToInstance)(_usersdto.AuthUserDto, req.body);
                const validationErrors = await (0, _classvalidator.validate)(userData);
                if (validationErrors.length > 0) {
                    res.status(422).json({
                        errors: validationErrors
                    });
                    return;
                }
                const { accessToken } = await this.authService.signIn(userData);
                res.status(200).json({
                    data: {
                        accessToken
                    },
                    message: 'login successful'
                });
            } catch (error) {
                next(error);
            }
        });
    }
};

//# sourceMappingURL=auth.controller.js.map