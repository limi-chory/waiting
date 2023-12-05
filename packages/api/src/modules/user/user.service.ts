import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '@entity'
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '@dto'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly users: Repository<User>) {}

  async findUserByEmail(email: string, isLogin?: boolean) {
    return this.users.findOne({ where: { email }, select: ['id', 'email', 'password', 'name'] })
  }

  async findUserById(id: number) {
    return this.users.findOne({ where: { id } })
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
      const user = await this.findUserById(userId)

      if (password) user.password = password
      if (name) user.name = name

      return this.users.save(user)
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}
