import { ConflictException, Injectable } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { QueryLectureDto } from './dto/query-lecture.dto';


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

  async findAll(query: QueryLectureDto) {
    const { search, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = query;

    const skip = (page - 1) * limit;

    const where: any = {};

    // Optional search by name, email, or other fields
    if (search) {
      where.OR = [
        { lectureName: { contains: search, mode: 'insensitive' } },
        { lectureEmail: { contains: search, mode: 'insensitive' } },
        { lecturePhone: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Fetch lectures with filters, pagination, and sorting
    const lectures = await this.prisma.lectures.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    // Count total records
    const total = await this.prisma.lectures.count({ where });

    return {
      data: lectures,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
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
