import { BadRequestException, Injectable, NotFoundException, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
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

export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService

  ) {}
 async create(data : User) : Promise<User> {
  try {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(data.password, saltOrRounds);
    const user = this.usersRepository.create({...data,password:hash});
    return await this.usersRepository.save(user);
  } catch (error) {
    return error
  }
    
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersRepository.findOneBy({email});
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, emai: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
}


  async update(id: number, updateUser: UpdateUserDto) {
    return await this.usersRepository.update({id:id},updateUser)
  }

  async remove(id: number) {
    const data=  await this.usersRepository.findBy({id:id});
    return await this.usersRepository.remove(data)
  }
}
