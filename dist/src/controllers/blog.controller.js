"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BlogController", {
    enumerable: true,
    get: function() {
        return BlogController;
    }
});
const _typedi = require("typedi");
const _blogservice = require("../services/blog.service");
const _HttpException = require("../exceptions/HttpException");
const _classtransformer = require("class-transformer");
const _blogsdto = require("../dtos/blogs.dto");
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
let BlogController = class BlogController {
    constructor(){
        _define_property(this, "blogService", _typedi.Container.get(_blogservice.BlogService));
        _define_property(this, "getAllBlogs", async (req, res, next)=>{
            try {
                const { page = 1, limit = 10 } = req.query;
                const { blogs, total } = await this.blogService.getAllBlogs({
                    page: Number(page),
                    limit: Number(limit)
                });
                res.status(200).json({
                    data: blogs,
                    meta: {
                        total,
                        page: Number(page),
                        limit: Number(limit),
                        pages: Math.ceil(total / Number(limit))
                    },
                    message: 'Blogs retrieved successfully'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "getBlogById", async (req, res, next)=>{
            try {
                const { id } = req.params;
                if (!id) throw new _HttpException.HttpException(400, 'Blog ID is required');
                const blog = await this.blogService.getBlogById(id);
                if (!blog) throw new _HttpException.HttpException(404, 'Blog not found');
                res.status(200).json({
                    data: blog,
                    message: 'Blog retrieved successfully'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "createBlog", async (req, res, next)=>{
            try {
                const blogData = (0, _classtransformer.plainToInstance)(_blogsdto.CreateBlogDto, req.body);
                const validationErrors = await (0, _classvalidator.validate)(blogData);
                if (validationErrors.length > 0) {
                    res.status(422).json({
                        errors: validationErrors
                    });
                    return;
                }
                const createdBlog = await this.blogService.createBlog(blogData);
                res.status(201).json({
                    data: {
                        blog: createdBlog
                    },
                    message: 'blog creation success'
                });
            } catch (error) {
                next(error);
            }
        });
    }
};

//# sourceMappingURL=blog.controller.js.map