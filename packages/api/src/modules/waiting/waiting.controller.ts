import { Controller, Get, Post, Put, Delete } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { WaitingService } from './waiting.service'

@ApiTags('waiting')
@Controller('waiting')
export class WaitingController {
  constructor(private readonly waitingService: WaitingService) {}

  @Get('/:id')
  readWaiting(): string {
    return this.waitingService.getHello()
  }

  @Get('/:id')
  readWaitings(): string {
    return 'read All'
  }

  @Post('/:id')
  createWaiting(): string {
    return 'create'
  }

  @Put('/:id')
  updateWaiting(): string {
    return 'update'
  }

  @Delete('/:id')
  deleteWaiting(): string {
    return 'delete'
  }
}
