import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UserCarModule } from './user_car/user_car.module';
import { UserCar } from './user_car/entities/user_car.entity';
import { PredictSalesModule } from './predict-sales/predict-sales.module';
import { PredictSale } from './predict-sales/entities/predict-sale.entity';

@Module({
  imports: [UserModule,ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'predict_sales_of_car',
    entities: [User,UserCar,PredictSale],
    synchronize: true,
  }),
    UserCarModule,
    PredictSalesModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
