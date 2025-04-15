import { Blog } from '@prisma/client';
import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsObject } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(100)
  public name: string;

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
  public id: string;

  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(100)
  public name: string;

  public createdAt: Date;
  public updatedAt: Date;

  @IsOptional()
  @IsObject()
  public blogs?: Blog;
}
