import { IsString, IsNotEmpty, MinLength, IsUrl } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  description: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  imgURL: string;

  @IsString()
  @IsNotEmpty()
  authorId: string;
}

export class UpdateBlogDto {
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  title?: string;

  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  description?: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  imgURL?: string;
}

export class BlogResponseDto {
  id: string;
  title: string;
  description: string;
  imgURL: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}
