import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Verification } from '@entity'

import { AuthController } from '../auth/auth.controller'
import { EmailService } from './email.service'

@Module({
  imports: [TypeOrmModule.forFeature([Verification])],
  providers: [EmailService],
})
export class EmailModule {}
