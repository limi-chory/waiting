import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'

import { UserGroup, UserRole, UserTeam } from '@entity'

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
  @ApiProperty()
  id: number

  @ApiProperty()
  email: string

  @ApiProperty()
  name: string

  @ApiProperty({
    enum: UserGroup,
    enumName: 'UserGroup',
  })
  @IsEnum(UserGroup)
  group: UserGroup

  @ApiProperty({
    enum: Object.values(UserTeam),
    enumName: 'UserTeam',
  })
  @IsEnum(UserTeam, { each: true })
  teams: UserTeam[]

  @ApiProperty({
    enum: UserRole,
    enumName: 'UserRole',
  })
  @IsEnum(UserRole)
  role: UserRole
}
