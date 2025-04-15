import { PrismaClient, Blog } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
import { CreateBlogDto } from '@/dtos/blogs.dto';

@Service()
export class BlogService {
  private readonly prisma = new PrismaClient();

  public async getAllBlogs({ page, limit }: { page: number; limit: number }): Promise<{ blogs: Blog[]; total: number }> {
    const [blogs, total] = await Promise.all([
      this.prisma.blog.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
          author: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.blog.count(),
    ]);

    return { blogs, total };
  }

  public async getBlogById(id: string): Promise<Blog> {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!blog) throw new HttpException(404, `Blog with ID ${id} not found`);

    return blog;
  }
  public async createBlog(blogData: CreateBlogDto): Promise<Blog> {
    return await this.prisma.blog.create({ data: blogData });
  }
  public async deleteBlogById(id: string, userId: string): Promise<void> {
    const foundBlog = await this.prisma.blog.findUnique({
      where: { id },
    });
    if (!foundBlog) {
      throw new HttpException(404, 'Blog not found');
    }
    if (foundBlog.authorId !== userId) {
      throw new HttpException(403, 'You are not authorized to delete this blog');
    }
    await this.prisma.blog.delete({
      where: { id },
    });
  }
  public async updateBlog(id: string, blogData: CreateBlogDto, userId: string): Promise<Blog> {
    const foundBlog = await this.prisma.blog.findUnique({
      where: { id },
    });

    if (!foundBlog) {
      throw new HttpException(404, 'Blog not found');
    }

    if (foundBlog.authorId !== userId) {
      throw new HttpException(403, 'You are not authorized to update this blog');
    }

    return await this.prisma.blog.update({
      where: { id },
      data: { ...blogData },
    });
  }
}
