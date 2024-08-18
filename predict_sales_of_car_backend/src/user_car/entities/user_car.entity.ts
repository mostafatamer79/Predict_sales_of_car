import { IsNotEmpty } from "class-validator";
import { PredictSale } from "src/predict-sales/entities/predict-sale.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserCar {
  @PrimaryGeneratedColumn()
  carid: number;

  @IsNotEmpty()
  @Column()
  years: number;

  @IsNotEmpty()
  @Column()
  economy: number;

  @IsNotEmpty()
  @Column()
  km: number;

  @IsNotEmpty()
  @Column()
  rating: number;

  @IsNotEmpty()
  @Column()
  condition: number;

  @IsNotEmpty()
  @Column()
  topspeed: number;

  @IsNotEmpty()
  @Column()
  hp: number;

  @IsNotEmpty()
  @Column()
  torque: number;

  // Many UserCar entities belong to one User
  @OneToOne(type => User, user => user.cars, {
    cascade: true,
    eager: false, 
  })
  user: User|number;

  @IsNotEmpty()
  @Column()
  prediction:number
}