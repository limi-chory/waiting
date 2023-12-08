import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger'

import { ApiOperation, AuthUser } from '@decorators'
import { User, UserTeam } from '@entity'

import { TeamService } from './team.service'
import { JwtAuthGuard } from '../auth/jwt.auth.guard'

@ApiTags('teams')
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('/:team/mates')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: '팀원 조회' })
  @ApiParam({
    name: 'team',
    enum: UserTeam,
    enumName: 'UserTeam',
    description: '팀 목록 중 선택',
  })
  async getTeammates(@AuthUser() user: User, @Param('team') team: UserTeam) {
    return this.teamService.getTeammates(user, team)
  }

  @Get('/:group')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: '그룹의 팀 조회' })
  async getTeams(@AuthUser() user: User) {
    return this.teamService.getTeams(user.group)
  }

  @Post('/:team')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: '팀 가입' })
  @ApiParam({
    name: 'team',
    enum: UserTeam,
    enumName: 'UserTeam',
    description: '팀 목록 중 선택',
  })
  async joinTeam(@AuthUser() user: User, @Param('team') team: UserTeam) {
    return this.teamService.joinTeam(user.id, team)
  }

  @Delete('/:team')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: '팀 탈퇴' })
  @ApiParam({
    name: 'team',
    enum: UserTeam,
    enumName: 'UserTeam',
    description: '팀 목록 중 선택',
  })
  async leaveTeam(@AuthUser() user: User, @Param('team') team: UserTeam) {
    return this.teamService.leaveTeam(user.id, team)
  }
}
