import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { LectureModule } from './lecture/lecture.module';


@Module({
  imports: [UserModule, PrismaModule, LectureModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
