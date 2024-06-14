import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import DuplicatedContentException from 'src/common/errors/DuplicatedContentException';
import * as bcrypt from 'bcrypt';
import { UserDocument, User } from './schemas/user-schema';
import LoginUserDTO from './dto/login-user-dto';
import RegisterUserDTO from './dto/register-user-dto';

@Injectable()
class UsersRepository {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(registerUserDTO: RegisterUserDTO): Promise<UserDocument> {
    const alreadyRegisteredUser = await this.userModel.findOne({ email: registerUserDTO.email });

    if (alreadyRegisteredUser) {
      throw new DuplicatedContentException('Email already in use. Try /users/login');
    }

    const result = await this.userModel.create(registerUserDTO);
    return result;
  }

  async findAll(): Promise<UserDocument[]> {
    const result = await this.userModel.find({});

    if (!result.length) {
      throw new NotFoundException('There is no user registered!');
    }

    return result;
  }

  async getById(id: string): Promise<UserDocument> {
    const result = await this.userModel.findById({ _id: id });

    if (!result) {
      throw new NotFoundException('There is no user with such id');
    }

    return result;
  }

  async updateUser(id: string, newInfo: RegisterUserDTO): Promise<UserDocument> {
    try {
      const updated = await this.userModel.findByIdAndUpdate({ _id: id }, newInfo, { new: true });
      return updated;
    } catch (err) {
      if (err instanceof mongoose.Error.CastError) {
        throw new BadRequestException('Id format is invalid!');
      }
      throw new InternalServerErrorException('An unknow error ocurred. Please try again later!');
    }
  }

  async loginUser(loginUserDTO: LoginUserDTO): Promise<UserDocument> {
    const result = await this.userModel.findOne({ email: loginUserDTO.email });

    if (!result) {
      throw new BadRequestException('Either the password or email are incorrect!');
    }

    if (!(await bcrypt.compare(loginUserDTO.password, result.password))) {
      throw new BadRequestException('Either the password or email are incorrect!');
    }

    return result;
  }

  async deleteUser(userID: string) {
    const result = await this.userModel.findByIdAndDelete(userID);
    return result;
  }

}

export default UsersRepository;