import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { ApiOperation } from '@decorators'

import { ReportService } from './report.service'

@ApiTags('reports')
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('/:id')
  @ApiOperation({ description: 'Report 조회' })
  readReport(@Param('id') id: string): string {
    return this.reportService.getHello()
  }

  @Get('/:id')
  @ApiOperation({ description: 'Report 리스트 조회' })
  readReports(@Param('id') id: string): string {
    return 'read All'
  }

  @Post('/:id')
  @ApiOperation({ description: 'Report 생성' })
  createReport(@Param('id') id: string): string {
    return 'create'
  }

  @Put('/:id')
  @ApiOperation({ description: 'Report 수정' })
  updateReport(@Param('id') id: string): string {
    return 'update'
  }

  @Delete('/:id')
  @ApiOperation({ description: 'Report 삭제' })
  deleteReport(@Param('id') id: string): string {
    return 'delete'
  }
}
