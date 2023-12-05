import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Core } from './core.entity'

@Entity()
export class Waiting extends Core {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string
}
