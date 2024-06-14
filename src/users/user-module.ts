import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { User, UserSchema } from './schemas/user-schema';
import UserController from './user-controller';
import UsersService from './user-service';
import UsersRepository from './user-repository';
import PasswordHash from './pipes/PasswordHash';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [
    UsersService,
    UsersRepository,
    PasswordHash,
    ConfigService,
  ],
  exports: [UsersService]
})
class UsersModule {}

export default UsersModule;
