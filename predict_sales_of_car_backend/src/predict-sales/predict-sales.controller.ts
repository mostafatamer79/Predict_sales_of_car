import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PredictSalesService } from './predict-sales.service';
import { CreatePredictSaleDto } from './dto/create-predict-sale.dto';
import { UpdatePredictSaleDto } from './dto/update-predict-sale.dto';

@Controller('predict-sales')
export class PredictSalesController {
  constructor(private readonly predictSalesService: PredictSalesService) {}

  @Post()
  create(@Body() createPredictSaleDto: CreatePredictSaleDto) {
    return this.predictSalesService.create(createPredictSaleDto);
  }

  @Get()
  findAll() {
    return this.predictSalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: string) {
    return this.predictSalesService.findOne(+id);
  }
  
  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: string, @Body() updatePredictSaleDto: UpdatePredictSaleDto) {
    return this.predictSalesService.update(+id, updatePredictSaleDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: string) {
    return this.predictSalesService.remove(+id);
  }
}
