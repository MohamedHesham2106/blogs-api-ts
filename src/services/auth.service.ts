import { PrismaClient, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { AuthUserDto, CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken } from '@/interfaces/auth.interface';
import { LoginResponse } from '@/interfaces/auth-response.interface';

@Service()
export class AuthService {
  private readonly prisma = new PrismaClient().user;

  // Method to register a new user
  public async signUp(userData: CreateUserDto): Promise<User> {
    const findUser: User = await this.prisma.findUnique({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    // Hash the user's password
    const hashedPassword = await hash(userData.password, 10);

    // Create a new user with the provided data and hashed password
    const createUserData: Promise<User> = this.prisma.create({ data: { ...userData, password: hashedPassword } });

    return createUserData;
  }

  public async signIn(userData: AuthUserDto): Promise<LoginResponse> {
    const findUser = await this.prisma.findUnique({
      where: { email: userData.email },
    });

    if (!findUser) {
      throw new HttpException(401, 'Invalid credentials');
    }

    const isPasswordValid = await compare(userData.password, findUser.password);
    if (!isPasswordValid) {
      throw new HttpException(401, 'Invalid credentials');
    }

    const token = this.createToken(findUser);

    return {
      accessToken: token,
    };
  }

  public createToken(user: User): string {
    const dataStoredInToken: DataStoredInToken = {
      id: user.id,
    };

    // 1hr
    const expiresIn = 60 * 60;

    return sign(dataStoredInToken, SECRET_KEY, { expiresIn });
  }
}
