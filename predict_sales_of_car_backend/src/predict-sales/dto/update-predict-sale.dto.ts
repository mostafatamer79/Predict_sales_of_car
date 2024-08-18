import { PartialType } from '@nestjs/mapped-types';
import { CreatePredictSaleDto } from './create-predict-sale.dto';
import { PredictSale } from '../entities/predict-sale.entity';

export class UpdatePredictSaleDto extends PartialType(PredictSale) {}
