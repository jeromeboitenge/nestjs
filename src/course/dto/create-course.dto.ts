import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @IsOptional()
    studentId!: string;

    @IsString()
    @IsOptional()
    lectureId!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    code!: string


}
