import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import UsersModule from './users/user-module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0/rpg-manager'),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}