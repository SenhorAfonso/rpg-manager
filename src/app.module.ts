import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import UsersModule from './users/user-module';
import CharactersModule from './character/character-module';
import GameModule from './game/game-module';
import PopulateModule from './populate/populate-module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0/rpg-manager'),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule,
    CharactersModule,
    GameModule,
    PopulateModule
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}