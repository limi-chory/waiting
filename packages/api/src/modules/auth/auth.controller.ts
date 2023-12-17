import { Controller, Get, Param, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'

import { LoginDto } from '@dto'
import { ApiOperation } from '@decorators'

import { EmailService } from '../email/email.service'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local.auth.guard'
import { TOKEN_EXPIRES_AFTER } from './consts'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly emailService: EmailService, private readonly authService: AuthService) {}

  @Post('/email-verification/:email')
  @ApiOperation({ description: '이메일 인증코드 전송' })
  sendVerifyEmail(@Param('email') to: string) {
    return this.emailService.sendVerificationEmail(to)
  }

  @Get('/email-verification/:email/:code')
  @ApiOperation({ description: '이메일 인증코드 확인' })
  verifyCode(@Param('email') email: string, @Param('code') code: string) {
    return this.emailService.verifyCode(email, code)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 401, description: '로그인 실패' })
  @ApiOperation({ description: '로그인' })
  async login(@Request() req) {
    if (!req.user) throw new UnauthorizedException()
    const now = new Date()
    const expires = new Date(now.getTime() + TOKEN_EXPIRES_AFTER)
    const token = await this.authService.createToken(req.user.id)

    return { token, expires }
  }
}
