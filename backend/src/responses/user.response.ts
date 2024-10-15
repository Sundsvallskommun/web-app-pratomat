import ApiResponse from '@/interfaces/api-service.interface';
import { ClientUser as ClientUserInterface, User as UserInterface } from '@/interfaces/users.interface';
import { Type } from 'class-transformer';
import { IsInt, IsString, ValidateNested } from 'class-validator';

export class ClientUser implements ClientUserInterface {
  @IsString()
  name: string;
  @IsString()
  username: string;
}

export class ClientUserApiResponse implements ApiResponse<ClientUser> {
  @ValidateNested()
  @Type(() => ClientUser)
  data: ClientUser;
  @IsString()
  message: string;
}

export class User implements UserInterface {
  @IsInt()
  id: string;
  @IsString()
  name: string;
  @IsString()
  username: string;
  @IsString()
  givenName: string;
  @IsString()
  surname: string;
  @IsString()
  userId: string;
}

export class UserApiResponse implements ApiResponse<User> {
  @ValidateNested()
  @Type(() => User)
  data: User;
  @IsString()
  message: string;
}
export class UsersApiResponse implements ApiResponse<User[]> {
  @ValidateNested({ each: true })
  @Type(() => User)
  data: User[];
  @IsString()
  message: string;
}
