import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '@entity'

import { UserController } from './user.controller'
import { UserService } from './user.service'
import { JwtStrategy } from '../auth/jwt.strategy'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
