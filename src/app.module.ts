import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { LectureModule } from './lecture/lecture.module';
import { CourseModule } from './course/course.module';


@Module({
  imports: [UserModule, PrismaModule, LectureModule, CourseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
