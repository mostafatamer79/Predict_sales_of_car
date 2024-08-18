import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, OneToMany } from 'typeorm';
import {  IsEmail, IsNotEmpty, IsNotEmptyObject, IsNumber, Length, Max, ValidateNested } from "class-validator"
import { UserCar } from 'src/user_car/entities/user_car.entity';

@Entity()
export class User {
@PrimaryGeneratedColumn()
  id: number;
  @IsNotEmpty()
  @Column()
  username: string;
  @IsNotEmpty()
  @Column()
  password: string;
  @IsEmail()
  @IsNotEmpty()
  @Column({
    unique: true
  })
  email: string;
  @OneToMany(type => UserCar, userCar => userCar.user)
  cars: UserCar[];
}
