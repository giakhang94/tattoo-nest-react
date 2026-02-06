import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { ResponseUserDto } from 'src/user/dtos/response-user.dto';

@Injectable()
export class HidePassword implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((value: any) => {
        try {
          if (Array.isArray(value) && typeof value === 'object') {
            return value.map((item) => ({
              ...item.toObject(),
              password: undefined,
            }));
          }
          return plainToInstance(
            ResponseUserDto,
            value.toObject() ? value.toObject() : value,
          );
        } catch (error) {
          throw new BadRequestException(
            error.message || 'some thing went wrong in the server',
          );
        }
      }),
    );
  }
}
