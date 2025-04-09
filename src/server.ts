import 'tsconfig-paths/register';
import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { AuthRoute } from './routes/auth.route';
import { BlogRoute } from './routes/blog.route';

ValidateEnv();

const app = new App([new AuthRoute(), new BlogRoute()]);

app.listen();
