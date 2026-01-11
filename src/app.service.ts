import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      message: 'Welcome to My Application!',
      status: 'success',
      statusCode: 200,
    };
  }
}
