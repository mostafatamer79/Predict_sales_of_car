import { IsNotEmpty } from "class-validator";
import { UserCar } from "src/user_car/entities/user_car.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PredictSale {
    @PrimaryGeneratedColumn()
    id : number;

    @IsNotEmpty()
    @Column()
    predictcarSales:number;

    
    
    }
