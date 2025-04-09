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
      }),
      this.prisma.blog.count(),
    ]);

    return { blogs, total };
  }

  public async getBlogById(id: string): Promise<Blog> {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) throw new HttpException(404, `Blog with ID ${id} not found`);

    return blog;
  }
  public async createBlog(blogData: CreateBlogDto): Promise<Blog> {
    return this.prisma.blog.create({ data: blogData });
  }
}
