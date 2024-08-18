import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserCarService } from './user_car.service';
import { CreateUserCarDto } from './dto/create-user_car.dto';
import { UpdateUserCarDto } from './dto/update-user_car.dto';
import { UserCar } from './entities/user_car.entity';

@Controller('user-car')
export class UserCarController {
  constructor(private readonly userCarService: UserCarService) {}

  @Post()
  create(@Body() createUserCarDto: UserCar) {
    return this.userCarService.create(createUserCarDto);
  }

  @Get()
  findAll() {
    return this.userCarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: string) {
    return this.userCarService.findOne(+id);
  }
  @Get('/car/:id')
  findOnebyuser(@Param('id',ParseIntPipe) id: string) {
    return this.userCarService.findOneByUser(+id);
  }
  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: string, @Body() updateUserCarDto: UpdateUserCarDto) {
    return this.userCarService.update(+id, updateUserCarDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: string) {
    return this.userCarService.remove(+id);
  }
}
