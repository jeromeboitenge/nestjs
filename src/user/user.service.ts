import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService
  ) { }
  async create(createUserDto: CreateUserDto) {
    const existEmail = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email
      }
    })
    if (existEmail) {
      throw new ConflictException('Email existing!')
    }
    const user = await this.prisma.user.create({
      data: createUserDto
    })

    return {
      message: "User created",
      user: user,
      status: true
    }

  }

  async findAll() {
    const users = await this.prisma.user.findMany()

    return users
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    })

    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id: id },
      data: updateUserDto
    })
    return user
  }

  async remove(id: string) {
    const user = await this.prisma.user.delete({
      where: { id: id }
    })
    return {
      status: true,
      message: "User deleted"
    }
  }

}
