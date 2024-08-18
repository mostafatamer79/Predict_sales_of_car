import { BadRequestException, Injectable, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePredictSaleDto } from './dto/create-predict-sale.dto';
import { UpdatePredictSaleDto } from './dto/update-predict-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PredictSale } from './entities/predict-sale.entity';
import { Repository } from 'typeorm';
@UsePipes(new ValidationPipe({
  exceptionFactory: (errors) => {
    // Customizing the error message
    const errorMessages = errors.map(
      err => `${err.property} has wrong value ${err.value}, ${Object.values(err.constraints).join(', ')}`
    );
    return new BadRequestException(errorMessages);
  },
}))
@Injectable()

export class PredictSalesService {
  constructor(
    @InjectRepository(PredictSale)
    private readonly PredictsRepository : Repository<PredictSale>
  ){}


  async create(createPredictSaleDto: CreatePredictSaleDto) {
    try {
      const new_data = await this.PredictsRepository.create(createPredictSaleDto);
    return await this.PredictsRepository.save(new_data);
    } catch (error) {
      throw new BadRequestException("Please enter the correct values");

    }
    
  }


  async findAll() {
    return await this.PredictsRepository.find();
  }

  async findOne(id: number) {
    const find_data = await this.PredictsRepository.findOneBy({id:id});
    if(!find_data){
    throw new NotFoundException(`User with ID ${id} not found`);
    }
    return find_data
  }
 

  async update(id: number, updatePredictSaleDto: UpdatePredictSaleDto) {
  
    return await this.PredictsRepository.update({id:id},updatePredictSaleDto);

  }
 
  async remove(id: number) {
    const find_data = await this.PredictsRepository.delete({id:id});
    if(!find_data){
    throw new NotFoundException(`User with ID ${id} not found`);
    }
    return find_data  }
}
