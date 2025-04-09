import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { AuthService } from '@services/auth.service';
import { CreateUserDto, AuthUserDto } from '@dtos/users.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class AuthController {
  private readonly authService = Container.get(AuthService);

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = plainToInstance(CreateUserDto, req.body);
      const validationErrors = await validate(userData);

      if (validationErrors.length > 0) {
        res.status(422).json({ errors: validationErrors });
        return;
      }

      const signUpUserData = await this.authService.signUp(userData);

      res.status(201).json({ data: { signUpUserData }, message: 'signup successful' });
    } catch (error) {
      next(error);
    }
  };

  public signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = plainToInstance(AuthUserDto, req.body);
      const validationErrors = await validate(userData);

      if (validationErrors.length > 0) {
        res.status(422).json({ errors: validationErrors });
        return;
      }

      const { accessToken } = await this.authService.signIn(userData);

      res.status(200).json({ data: { accessToken }, message: 'login successful' });
    } catch (error) {
      next(error);
    }
  };
}
