import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

import { CreateUserDto, UpdateUserDto, UserResponseDto } from '@dto'
import { User, UserTeam } from '@entity'
import { AuthUser } from '@decorators'

import { JwtAuthGuard } from '../auth/jwt.auth.guard'
import { UserService } from './user.service'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: 201,
    type: UserResponseDto,
    description: '회원가입 완료',
  })
  @ApiOperation({ description: '회원가입' })
  @ApiBody({ type: CreateUserDto, description: '회원가입 정보 입력' })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.createUser(createUserDto)
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto, description: '회원 수정 정보 입력' })
  async updateUser(@AuthUser() user: User, @Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    return this.userService.updateUser(user.id, updateUserDto)
  }

  @Get('/teammates/:team')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'team',
    enum: UserTeam,
    enumName: 'UserTeam',
    description: '팀 목록 중 선택',
  })
  async getTeammates(@AuthUser() user: User, @Param('team') team: UserTeam) {
    return this.userService.getTeammates(user, team)
  }

  @Post('/teams/:team')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'team',
    enum: UserTeam,
    enumName: 'UserTeam',
    description: '팀 목록 중 선택',
  })
  async joinTeam(@AuthUser() user: User, @Param('team') team: UserTeam) {
    return this.userService.joinTeam(user.id, team)
  }

  @Delete('/teams/:team')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'team',
    enum: UserTeam,
    enumName: 'UserTeam',
    description: '팀 목록 중 선택',
  })
  async leaveTeam(@AuthUser() user: User, @Param('team') team: UserTeam) {
    return this.userService.leaveTeam(user.id, team)
  }
}
