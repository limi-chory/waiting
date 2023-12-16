import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, Not, Repository } from 'typeorm'
import { startOfDay, endOfDay } from 'date-fns'

import { Meeting, MeetingStatus, UserRole } from '@entity'
import { MeetingRequestDto, MeetingResponseDto, MeetingStatusRequestDto } from '@dto'

import { UserService } from '../user'

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting) private readonly meetings: Repository<Meeting>,
    private readonly userService: UserService,
  ) {}

  getHello(): string {
    return 'Hello from ExampleService!'
  }

  async getMeetingById(id: number): Promise<MeetingResponseDto> {
    return this.meetings.findOne({
      where: { id },
      relations: ['reporter', 'recipient'],
      select: ['id', 'createdAt', 'content', 'status'],
    })
  }

  async createMeeting(
    reporterId: number,
    recipientId: number,
    { content }: MeetingRequestDto,
  ): Promise<MeetingResponseDto> {
    try {
      const now = new Date()
      const startOfToday = startOfDay(now)
      const endOfToday = endOfDay(now)

      const exists = await this.meetings.exist({
        where: {
          createdAt: Between(startOfToday, endOfToday),
          reporter: { id: reporterId },
          recipient: { id: recipientId },
          status: Not(MeetingStatus.ACCEPTED),
        },
      })

      if (exists) throw new ConflictException()

      const reporter = await this.userService.getUserById(reporterId)
      const recipient = await this.userService.getUserById(recipientId)

      if (!reporter || !recipient) throw new NotFoundException()
      if (recipient.role !== UserRole.RECIPIENT) throw new BadRequestException()

      return this.meetings.save(this.meetings.create({ reporter, recipient, content }))
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async updateMeeting(
    meetingId: number,
    reporterId: number,
    { content }: MeetingRequestDto,
  ): Promise<MeetingResponseDto> {
    try {
      const meeting = (await this.getMeetingById(meetingId)) as any

      if (!meeting) throw new NotFoundException()
      if (meeting.reporter.id !== reporterId) throw new UnauthorizedException()

      meeting.content = content

      return this.meetings.save(meeting)
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async deleteMeeting(meetingId: number, userId: number): Promise<boolean> {
    try {
      const meeting = (await this.getMeetingById(meetingId)) as any

      if (!meeting) throw new NotFoundException()
      if (meeting.reporter.id !== userId && meeting.recipient.id !== userId) throw new UnauthorizedException()

      const result = (await this.meetings.remove(meeting)) as any

      return result.id === undefined
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async updateMeetingStatus(
    meetingId: number,
    recipientId: number,
    { status }: MeetingStatusRequestDto,
  ): Promise<MeetingResponseDto> {
    try {
      const meeting = (await this.getMeetingById(meetingId)) as any

      if (!meeting) throw new NotFoundException()
      if (meeting.recipient.id !== recipientId) throw new UnauthorizedException()

      meeting.status = status

      return this.meetings.save(meeting)
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}
