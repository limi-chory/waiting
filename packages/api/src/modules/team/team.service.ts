import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Not, Repository } from 'typeorm'

import { GroupTeamMap, User, UserGroup, UserTeam } from '@entity'
import { UserResponseDto } from '@dto'
import { getTeamLabels } from '@util'

import { UserService } from '../user'

@Injectable()
export class TeamService {
  constructor(@InjectRepository(User) private readonly users: Repository<User>, private readonly userService: UserService) {}

  async getTeammates(user: User, team: UserTeam) {
    try {
      if (!user.teams || !user.teams.includes(team)) throw new ForbiddenException()

      return this.users.find({
        where: { teams: Like(`%${team}%`) as any, id: Not(user.id) },
      })
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async getTeams(group: UserGroup): Promise<string[]> {
    return getTeamLabels(GroupTeamMap[group])
  }

  async joinTeam(userId: number, team: UserTeam): Promise<UserResponseDto> {
    try {
      const user = await this.userService.getUserById(userId)

      if (!GroupTeamMap[user.group].includes(team)) throw new ForbiddenException()
      if (!Object.values(UserTeam).includes(team)) throw new NotFoundException()
      if (user.teams && user.teams.includes(team)) throw new ConflictException()
      user.teams = user.teams ? [...user.teams, team] : [team]

      return this.users.save(user)
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async leaveTeam(userId: number, team: UserTeam): Promise<UserResponseDto> {
    try {
      const user = await this.userService.getUserById(userId)

      if (!user.teams || !user.teams.includes(team)) return user

      user.teams = [...user.teams].filter((t) => t !== team)
      return this.users.save(user)
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}
