import { Module } from '@nestjs/common';
import { PredictSalesService } from './predict-sales.service';
import { PredictSalesController } from './predict-sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PredictSale } from './entities/predict-sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PredictSale]),
  ConfigModule.forRoot(),],
  controllers: [PredictSalesController],
  providers: [PredictSalesService],
  exports:[TypeOrmModule.forFeature([PredictSale]),
  ConfigModule.forRoot()]
})
export class PredictSalesModule {}
