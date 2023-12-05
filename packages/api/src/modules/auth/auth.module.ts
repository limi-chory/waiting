import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { EmailService } from '../email'
import { JWT_SECRET } from './consts'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User, Verification } from '@entity'
import { PassportModule } from '@nestjs/passport'
import { UserService } from '../user'
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: 60 * 10 },
    }),
    TypeOrmModule.forFeature([Verification, User]),
  ],
  providers: [AuthService, EmailService, UserService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
