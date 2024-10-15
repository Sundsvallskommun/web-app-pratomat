import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { ClientUser, User } from '@/interfaces/users.interface';
import { ClientUserApiResponse, UsersApiResponse, UserApiResponse } from '@/responses/user.response';
import prisma from '@/utils/prisma';
import authMiddleware from '@middlewares/auth.middleware';
import { Controller, Get, Param, Req, Res, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@Controller()
export class UserController {
  @Get('/me')
  @OpenAPI({
    summary: 'Return current user',
  })
  @ResponseSchema(ClientUserApiResponse)
  @UseBefore(authMiddleware)
  async getMe(@Req() req: RequestWithUser, @Res() response: any): Promise<ClientUser> {
    const { name, username } = req.user;

    if (!name) {
      throw new HttpException(400, 'Bad Request');
    }

    const userData: ClientUser = {
      name: name,
      username: username,
    };

    return response.send({ data: userData, message: 'success' });
  }
}
