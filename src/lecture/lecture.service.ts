import { ConflictException, Injectable } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class LectureService {

  constructor(
    private readonly prisma: PrismaService
  ) { }
  async create(createLectureDto: CreateLectureDto) {
    const isEmailExit = await this.prisma.lectures.findUnique({
      where: { lectureEmail: createLectureDto.lectureEmail }
    })
    if (isEmailExit) {
      throw new ConflictException('User alread exists')
    }
    const hashedPassword = await bcrypt.hash(createLectureDto.lecturePassword, 12)
    const lecture = await this.prisma.lectures.create({
      data: { ...createLectureDto, lecturePassword: hashedPassword }
    })

    return {
      message: 'user created successfuly',
      lecture: lecture,
      status: true
    }

  }

  async findAll() {
    const lecture = await this.prisma.lectures.findMany();
    return lecture;
  }
  // searching lectures using email or id
  async findOne(key: string) {
    const lecture = await this.prisma.lectures.findFirst(
      { where: { OR: [{ lectureId: key }, { lectureEmail: key }] } })
    return lecture
  }

  async update(id: string, updateLectureDto: UpdateLectureDto) {
    if (updateLectureDto.lecturePassword) {
      updateLectureDto.lecturePassword = await bcrypt.hash(updateLectureDto.lecturePassword, 10)
    }

    const lecture = await this.prisma.lectures.update({
      where: {
        lectureId: id
      }
      , data: updateLectureDto
    })
  }

  async remove(id: string) {
    const lecture = await this.prisma.lectures.delete({
      where: { lectureId: id }
    })
    return {
      message: 'user deleted successfuly',
      status: true,
      lecture: lecture.lectureEmail
    }
  }
}
