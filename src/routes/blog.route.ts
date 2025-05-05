import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Router } from 'express';
import { BlogController } from '@/controllers/blog.controller';

import { CreateBlogDto } from '@/dtos/blogs.dto';

import { Routes } from '@/interfaces/routes.interface';
import { createRouteHandler } from 'uploadthing/express';
import { uploadRouter } from '@/middlewares/uploadthing.middleware';
import { UPLOADTHING_TOKEN } from '@/config';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class BlogRoute implements Routes {
  public path = '/';
  public router = Router();
  public blogController = new BlogController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.use(
      `${this.path}uploadthing`,
      createRouteHandler({
        router: uploadRouter,
        config: {
          token: UPLOADTHING_TOKEN,
        },
      }),
    );

    this.router.get(`${this.path}blog`, this.blogController.getAllBlogs);
    this.router.get(`${this.path}blog/:id`, this.blogController.getBlogById);
    this.router.post(
      `${this.path}blog`,
      AuthMiddleware,
      ValidationMiddleware(CreateBlogDto),
      createRouteHandler({
        router: uploadRouter,
        config: {
          token: UPLOADTHING_TOKEN,
        },
      }),
      this.blogController.createBlog,
    );
    this.router.delete(`${this.path}blog/:id`, AuthMiddleware, this.blogController.deleteBlog);
    this.router.put(
      `${this.path}blog/:id`,
      AuthMiddleware,
      createRouteHandler({
        router: uploadRouter,
        config: {
          token: UPLOADTHING_TOKEN,
        },
      }),
      this.blogController.updateBlog,
    );
  }
}
