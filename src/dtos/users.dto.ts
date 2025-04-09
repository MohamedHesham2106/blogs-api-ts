import { Blog } from '@prisma/client';
import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsObject } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(100)
  public password: string;
}
export class AuthUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(100)
  public password: string;
}
export class UserResponseDto {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  @IsOptional()
  @IsObject()
  blogs?: Blog;
}
