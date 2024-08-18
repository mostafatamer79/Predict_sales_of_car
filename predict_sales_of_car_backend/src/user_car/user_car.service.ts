import { BadRequestException, Injectable, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserCarDto } from './dto/create-user_car.dto';
import { UpdateUserCarDto } from './dto/update-user_car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCar } from './entities/user_car.entity';
import axios from 'axios';
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
export class UserCarService {
  constructor(
    @InjectRepository(UserCar)
    private userscarRepository: Repository<UserCar>,){}

    @UsePipes(ValidationPipe)
  async create(createUserCarDto: UserCar) {
    try {
      const { user, ...dataToSend } = createUserCarDto;

      const flaskResponse = await axios.post('http://127.0.0.1:5000/predict', [dataToSend]);
      const prediction = flaskResponse.data.predictions[0];
      // Get the prediction from Flask API response
      createUserCarDto.prediction = prediction;

       // Assuming one prediction is returned
      const new_data = await this.userscarRepository.create(createUserCarDto)
      return  await this.userscarRepository.save(new_data)
    } catch (error) {
      throw new BadRequestException("Please enter the correct values");
    }
 
  }

  async findAll() {
    return await this.userscarRepository.find()
  }

  async findOne(id: number) {

    const findData = await this.userscarRepository.findOneBy({carid:id})
    if(!findData){
      throw new  NotFoundException({message:"this id is not found"})
    }
    return findData
  }
  
  async findOneByUser(id: number) {
    const numericId = Number(id);
    if (isNaN(numericId) || numericId <= 0) {
      throw new BadRequestException("Invalid ID. Please enter a valid positive number.");
    }

    const findData = await this.userscarRepository.find({
      where: { user: { id: numericId } }, 
      relations: ['user'], 
    });
    if (findData.length === 0) {
      throw new NotFoundException("No UserCar records found for this User ID.");
    }

    return findData;
  }
  
  @UsePipes(ValidationPipe)

  async update(id: number, updateUserCarDto: UpdateUserCarDto) {
    const findData = await this.userscarRepository.findOneBy({carid:id})
    if(!findData){
      throw new  NotFoundException({message:"this id is not found"})
    }
    return this.userscarRepository.update({carid:id},updateUserCarDto)
  }

  async remove(id: number) {
    const findData = await this.userscarRepository.findOneBy({carid:id})
    if(!findData){
      throw new  NotFoundException({message:"this id is not found"})
    }
    return await this.userscarRepository.delete({carid:id});
  }
}
