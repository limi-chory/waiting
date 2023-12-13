import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Not, Repository } from 'typeorm'

import { GroupTeamMap, User, UserGroup } from '@entity'
import { getTeamLabel, getTeamLabels } from '@util'

import { UserService } from '../user'

@Injectable()
export class TeamService {
  constructor(@InjectRepository(User) private readonly users: Repository<User>, private readonly userService: UserService) {}

  async getTeammates(user: User) {
    try {
      if (!user.teams?.length) return {}

      const teamUsersMap: Record<string, User[]> = {}

      for (const team of user.teams) {
        const teammates = await this.users.find({
          where: { teams: Like(`%${team}%`) as any, id: Not(user.id) },
          select: ['id', 'email', 'name', 'role', 'teams'],
        })

        const teamWithLabel = getTeamLabel(team)
        teamUsersMap[teamWithLabel.label] = teammates
      }

      return teamUsersMap
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async getTeams(group: UserGroup): Promise<object[]> {
    return getTeamLabels(GroupTeamMap[group])
  }
}
