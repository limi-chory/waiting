import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Not, Repository } from 'typeorm'

import { GroupTeamMap, User, UserTeam } from '@entity'
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '@dto'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly users: Repository<User>) {}

  async getUserByEmail(email: string, isLogin?: boolean) {
    return this.users.findOne({ where: { email }, select: ['id', 'email', 'password', 'name'] })
  }

  async getUserById(id: number) {
    return this.users.findOne({ where: { id } })
  }

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

  async createUser({ email, password, name }: CreateUserDto): Promise<UserResponseDto> {
    try {
      const exists = await this.users.exist({ where: { email } })

      if (exists) throw new ConflictException()

      const user = await this.users.save(this.users.create({ email, password, name }))
      return user
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async updateUser(userId: number, { password, name }: UpdateUserDto): Promise<UserResponseDto> {
    try {
      const user = await this.getUserById(userId)

      if (password) user.password = password
      if (name) user.name = name

      return this.users.save(user)
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async joinTeam(userId: number, team: UserTeam): Promise<UserResponseDto> {
    try {
      const user = await this.getUserById(userId)

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
      const user = await this.getUserById(userId)

      if (!user.teams || !user.teams.includes(team)) return user

      user.teams = [...user.teams].filter((t) => t !== team)
      return this.users.save(user)
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}
