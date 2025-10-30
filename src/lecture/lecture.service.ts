import { ConflictException, Injectable } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { PrismaService } from '../prisma/prisma.service';



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
    const lecture = await this.prisma.lectures.create({
      data: createLectureDto
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

  async findOne(id: string) {
    const lecture = await this.prisma.lectures.findUnique({ where: { lectureId: id } })
    return lecture
  }

  async update(id: string, updateLectureDto: UpdateLectureDto) {
    const lecture = await this.prisma.lectures.update({
      where: {
        lectureId: id
      }
      , data: UpdateLectureDto
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
