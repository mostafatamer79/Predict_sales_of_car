import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  ConfigModule.forRoot(),

  JwtModule.register({
    global: true,
    secret: process.env.JWTSECRET,
    signOptions: { expiresIn: '20s' },
  }),],

  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
