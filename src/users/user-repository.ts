/* eslint-disable no-useless-constructor */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DuplicatedContentException from 'src/common/errors/DuplicatedContentException';
import { UserDocument, User } from './schemas/user-schema';
import { CreateUserType } from './Validation/create-user-validator';
import { LoginUserType } from './Validation/login-user-validator';

@Injectable()
class UsersRepository {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserPayload: CreateUserType): Promise<UserDocument> {
    const alreadyRegisteredUser = await this.userModel.findOne({ email: createUserPayload.email });

    if (alreadyRegisteredUser) {
      throw new DuplicatedContentException('Email already in use. Try /users/login');
    }

    const result = await this.userModel.create(createUserPayload);
    return result;
  }

  async findAll(): Promise<UserDocument[]> {
    const result = await this.userModel.find({});

    if (result.length === 0) {
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

  async updateUser(id: string, newInfo: CreateUserType): Promise<UserDocument> {
    const updated = await this.userModel.findById({ _id: id }, newInfo, { new: true });
    return updated;
  }

  async loginUser(loginUserDTO: LoginUserType): Promise<UserDocument> {
    const result = await this.userModel.findOne({ email: loginUserDTO.email });

    if (!result) {
      throw new BadRequestException('Either the password or email are incorrect!');
    }

    if (result.password !== loginUserDTO.password) {
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