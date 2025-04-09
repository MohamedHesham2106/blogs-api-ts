import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Router } from 'express';
import { BlogController } from '@/controllers/blog.controller';

import { CreateBlogDto } from '@/dtos/blogs.dto';

import { Routes } from '@/interfaces/routes.interface';

export class BlogRoute implements Routes {
  public path = '/';
  public router = Router();
  public blogController = new BlogController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}blog`, this.blogController.getAllBlogs);
    this.router.get(`${this.path}blog/:id`, this.blogController.getBlogById);
    this.router.post(`${this.path}blog`, ValidationMiddleware(CreateBlogDto), this.blogController.createBlog);
  }
}
