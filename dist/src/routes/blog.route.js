"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BlogRoute", {
    enumerable: true,
    get: function() {
        return BlogRoute;
    }
});
const _validationmiddleware = require("../middlewares/validation.middleware");
const _express = require("express");
const _blogcontroller = require("../controllers/blog.controller");
const _blogsdto = require("../dtos/blogs.dto");
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
let BlogRoute = class BlogRoute {
    initializeRoutes() {
        this.router.get(`${this.path}blog`, this.blogController.getAllBlogs);
        this.router.get(`${this.path}blog/:id`, this.blogController.getBlogById);
        this.router.post(`${this.path}blog`, (0, _validationmiddleware.ValidationMiddleware)(_blogsdto.CreateBlogDto), this.blogController.createBlog);
    }
    constructor(){
        _define_property(this, "path", '/');
        _define_property(this, "router", (0, _express.Router)());
        _define_property(this, "blogController", new _blogcontroller.BlogController());
        this.initializeRoutes();
    }
};

//# sourceMappingURL=blog.route.js.map