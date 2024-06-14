import AuthorizationGuard from 'src/common/guards/AuthorizationGuard';
import { Body, Controller, Get, Post, Put, UseGuards, UsePipes, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UserDocument } from './schemas/user-schema';
import UsersService from './user-service';
import PasswordHash from './pipes/PasswordHash';
import LoginUserDTO from './dto/login-user-dto';
import RegisterUserDTO from './dto/register-user-dto';
import UpdateUserDTO from './dto/update-user-dto';

interface userID {
  user: string;
}

@Controller('/users')
class UserController {

  constructor(private readonly userService: UsersService) { }

  @Get()
  @UseGuards(AuthorizationGuard)
  async getAllUser(): Promise<UserDocument[]> {
    const result = await this.userService.findAll();
    return result;
  }

  @Get(':user')
  @UseGuards(AuthorizationGuard)
  getById(@Param() user: userID): Promise<UserDocument> {
    const id = user.user;
    const result = this.userService.getById(id);
    return result;
  }

  @Post('/register')
  @UsePipes(new ValidationPipe({ transform: true }), PasswordHash)
  async createNewUser(@Body() registerUserDTO: RegisterUserDTO) {
    const { createdUser, token } = await this.userService.registerUser(registerUserDTO);
    return { createdUser, token };
  }

  @Post('/login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async loginUser(@Body() loginUserDTO: LoginUserDTO) {
    const { logedUser, token } = await this.userService.loginUser(loginUserDTO);
    return { logedUser, token };
  }

  @Put(':user')
  @UseGuards(AuthorizationGuard)
  @UsePipes(new ValidationPipe({ transform: true }), PasswordHash)
  async updateUser(
    @Param() user: userID,
    @Body() updateUserDTO: UpdateUserDTO
  ): Promise<
    UserDocument
  > {
    const id = user.user;
    const updatedUser = await this.userService.updateUser(id, updateUserDTO);
    return updatedUser;
  }

  @Delete(':user')
  @UseGuards(AuthorizationGuard)
  async deleteUser(
    @Param() user: userID
  ): Promise<
  UserDocument
  > {
    const id = user.user;
    const deletedUser = await this.userService.deleteUser(id);
    return deletedUser;
  }

}

export default UserController;