import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IsEnum } from 'class-validator'

import { Core } from './core.entity'
import { User } from './user.entity'
import { ReportStatus } from './types'

@Entity()
export class Report extends Core {
  @PrimaryGeneratedColumn()
  id: number

  @JoinColumn({ name: 'reporter_id', referencedColumnName: 'id' })
  @ManyToOne(() => User)
  reporter: User

  @JoinColumn({ name: 'recipients_id', referencedColumnName: 'id' })
  @ManyToOne(() => User)
  recipient: User

  @Column({ type: 'enum', enum: ReportStatus, default: ReportStatus.PENDING })
  @IsEnum(ReportStatus)
  status: ReportStatus
}
