import { IS_LENGTH, IsEmail, isNotEmpty, IsNotEmpty, IsPhoneNumber, isPhoneNumber, IsString } from "class-validator";

export class CreateLectureDto {
    @IsString()
    @IsNotEmpty()
    lectureName !: string;

    @IsEmail()
    @IsNotEmpty()
    lectureEmail !: string


    @IsNotEmpty()
    @IsPhoneNumber()
    lecturePhone !: string

    @IsNotEmpty()
    @IsString()
    lecturePassword !: string
}
