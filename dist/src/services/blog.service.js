"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BlogService", {
    enumerable: true,
    get: function() {
        return BlogService;
    }
});
const _client = require("@prisma/client");
const _typedi = require("typedi");
const _HttpException = require("../exceptions/HttpException");
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
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let BlogService = class BlogService {
    async getAllBlogs({ page, limit }) {
        const [blogs, total] = await Promise.all([
            this.prisma.blog.findMany({
                skip: (page - 1) * limit,
                take: limit
            }),
            this.prisma.blog.count()
        ]);
        return {
            blogs,
            total
        };
    }
    async getBlogById(id) {
        const blog = await this.prisma.blog.findUnique({
            where: {
                id
            }
        });
        if (!blog) throw new _HttpException.HttpException(404, `Blog with ID ${id} not found`);
        return blog;
    }
    async createBlog(blogData) {
        return this.prisma.blog.create({
            data: blogData
        });
    }
    constructor(){
        _define_property(this, "prisma", new _client.PrismaClient());
    }
};
BlogService = _ts_decorate([
    (0, _typedi.Service)()
], BlogService);

//# sourceMappingURL=blog.service.js.map