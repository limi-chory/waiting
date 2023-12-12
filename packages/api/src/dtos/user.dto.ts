import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'

import { UserRole } from '@entity'

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
  @ApiProperty({ description: '이름' })
  name: string

  @IsNotEmpty()
  @ApiProperty({
    enum: UserRole,
    enumName: 'UserRole',
  })
  @IsEnum(UserRole)
  role: UserRole

  @IsNotEmpty()
  @ApiProperty({ description: '팀', isArray: true, type: 'string' })
  teams: string[]
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
  @ApiProperty()
  id: number

  @ApiProperty()
  email: string

  @ApiProperty()
  name: string

  @ApiProperty()
  group: string

  @ApiProperty()
  teams: string[]

  @ApiProperty({
    enum: UserRole,
    enumName: 'UserRole',
  })
  @IsEnum(UserRole)
  role: UserRole
}
