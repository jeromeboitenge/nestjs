import { IsString, IsEmail, IsNotEmpty, isNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty() 
  password!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;
}
