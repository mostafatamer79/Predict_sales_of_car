import { Module } from '@nestjs/common';
import { UserCarService } from './user_car.service';
import { UserCarController } from './user_car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserCar } from './entities/user_car.entity';
import { PredictSale } from '../predict-sales/entities/predict-sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCar]),
  ConfigModule.forRoot(),TypeOrmModule.forFeature([PredictSale]),
  ConfigModule.forRoot(),],
  controllers: [UserCarController],
  providers: [UserCarService],
})
export class UserCarModule {}
