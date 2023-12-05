import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: '이메일 주소' })
  email: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '비밀번호' })
  password: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '이름' })
  name: string
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '비밀번호' })
  password: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '이름' })
  name: string
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: '이메일 주소' })
  email: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '비밀번호' })
  password: string
}

export class UserResponseDto {
  email: string
  name: string
}
