import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { BlogService } from '@/services/blog.service';
import { HttpException } from '@/exceptions/HttpException';
import { plainToInstance } from 'class-transformer';
import { CreateBlogDto } from '@/dtos/blogs.dto';
import { validate } from 'class-validator';

export class BlogController {
  private readonly blogService = Container.get(BlogService);

  public getAllBlogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const { blogs, total } = await this.blogService.getAllBlogs({
        page: Number(page),
        limit: Number(limit),
      });

      res.status(200).json({
        data: blogs,
        meta: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / Number(limit)),
        },
        message: 'Blogs retrieved successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public getBlogById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) throw new HttpException(400, 'Blog ID is required');

      const blog = await this.blogService.getBlogById(id);

      if (!blog) throw new HttpException(404, 'Blog not found');

      res.status(200).json({
        data: blog,
        message: 'Blog retrieved successfully',
      });
    } catch (error) {
      next(error);
    }
  };
  public createBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const blogData = plainToInstance(CreateBlogDto, req.body);
      const validationErrors = await validate(blogData);
      if (validationErrors.length > 0) {
        res.status(422).json({ errors: validationErrors });
        return;
      }
      const createdBlog = await this.blogService.createBlog(blogData);
      res.status(201).json({
        data: {
          blog: createdBlog,
        },
        message: 'blog creation success',
      });
    } catch (error) {
      next(error);
    }
  };
}
