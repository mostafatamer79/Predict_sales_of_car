import { PartialType } from '@nestjs/mapped-types';
import { CreateUserCarDto } from './create-user_car.dto';
import { UserCar } from '../entities/user_car.entity';

export class UpdateUserCarDto extends PartialType(UserCar) {}
