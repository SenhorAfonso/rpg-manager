import ZodValidatorPipe from 'src/common/pipes/ZodValidatorPipe';
import AuthorizationGuard from 'src/common/guards/AuthorizationGuard';
import { Body, Controller, Get, Post, Put, UseGuards, UsePipes, Param, Delete } from '@nestjs/common';
import { UserDocument } from './schemas/user-schema';
import UsersService from './user-service';
import { createUserValidatorObject, CreateUserType } from './Validation/create-user-validator';
import { LoginUserType, loginUserValidatorObject } from './Validation/login-user-validator';

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
  @UsePipes(new ZodValidatorPipe(createUserValidatorObject))
  async createNewUser(@Body() createUserDTO: CreateUserType) {
    const { createdUser, token } = await this.userService.registerUser(createUserDTO);
    return { createdUser, token };
  }

  @Post('/login')
  @UsePipes(new ZodValidatorPipe(loginUserValidatorObject))
  async loginUser(@Body() loginUserDTO: LoginUserType) {
    const { logedUser, token } = await this.userService.loginUser(loginUserDTO);
    return { logedUser, token };
  }

  @Put(':user')
  @UseGuards(AuthorizationGuard)
  async updateUser(
    @Param() user: userID,
    @Body() updateUserDTO: CreateUserType
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