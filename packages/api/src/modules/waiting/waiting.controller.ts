import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { ApiOperation } from '@decorators'

import { WaitingService } from './waiting.service'

@ApiTags('waiting')
@Controller('waiting')
export class WaitingController {
  constructor(private readonly waitingService: WaitingService) {}

  @Get('/:id')
  @ApiOperation({ description: 'Waiting 조회' })
  readWaiting(@Param('id') id: string): string {
    return this.waitingService.getHello()
  }

  @Get('/:id')
  @ApiOperation({ description: 'Waiting 리스트 조회' })
  readWaitings(@Param('id') id: string): string {
    return 'read All'
  }

  @Post('/:id')
  @ApiOperation({ description: 'Waiting 생성' })
  createWaiting(@Param('id') id: string): string {
    return 'create'
  }

  @Put('/:id')
  @ApiOperation({ description: 'Waiting 수정' })
  updateWaiting(@Param('id') id: string): string {
    return 'update'
  }

  @Delete('/:id')
  @ApiOperation({ description: 'Waiting 삭제' })
  deleteWaiting(@Param('id') id: string): string {
    return 'delete'
  }
}
