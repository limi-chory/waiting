import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { AuthUser } from '@decorators'
import { User } from '@entity'

import { MeService } from './me.service'
import { JwtAuthGuard } from '../auth/jwt.auth.guard'

@ApiTags('me')
@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getMe(@AuthUser() user: User) {
    return this.meService.getMe(user.id)
  }
}
