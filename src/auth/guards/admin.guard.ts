import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
interface User {
  role: string;
}
interface RequestWithUser extends Request {
  user: User;
}
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user as User | undefined;
    if (user?.role !== 'admin') {
      throw new ForbiddenException('Admin only');
    }
    return true;
  }
}
