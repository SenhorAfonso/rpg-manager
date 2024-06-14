import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDocument } from './schemas/user-schema';
import UsersRepository from './user-repository';
import LoginUserDTO from './dto/login-user-dto';
import RegisterUserDTO from './dto/register-user-dto';

@Injectable()
class UsersService {

  constructor(
    private readonly userRepository: UsersRepository,
    private readonly configService: ConfigService
  ) {}

  async registerUser(registerUserDTO: RegisterUserDTO): Promise<{
    createdUser: UserDocument,
    token: string
  }> {
    const createdUser = await this.userRepository.create(registerUserDTO);
    const userID = createdUser.id;
    const token = jwt.sign({ userID }, this.configService.get<string>('JWT_SECRET'));
    return { createdUser, token };
  }

  async findAll(): Promise<UserDocument[]> {
    const result = await this.userRepository.findAll();
    return result;
  }

  async getById(id: string): Promise<UserDocument> {
    const result = await this.userRepository.getById(id);
    return result;
  }

  async updateUser(
    id: string,
    newInfo: any
  ): Promise<UserDocument> {
    const result = await this.userRepository.updateUser(id, newInfo);
    return result;
  }

  async loginUser(loginUserDTO: LoginUserDTO): Promise<{
    logedUser: UserDocument,
    token: string
  }> {
    const logedUser = await this.userRepository.loginUser(loginUserDTO);
    const userID = await logedUser.id;
    const token = jwt.sign({ userID }, this.configService.get<string>('JWT_SECRET'));

    return { logedUser, token };
  }

  async deleteUser(userID: string) {
    const result = await this.userRepository.deleteUser(userID);
    return result;
  }
}

export default UsersService;