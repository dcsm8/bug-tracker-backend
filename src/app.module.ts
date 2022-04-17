import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MikroOrmModule.forRoot(),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
