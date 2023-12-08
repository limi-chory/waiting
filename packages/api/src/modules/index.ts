import { AuthModule } from './auth'
import { EmailModule } from './email'
import { MeModule } from './me'
import { TeamModule } from './team'
import { UserModule } from './user'
import { WaitingModule } from './waiting'

export * from './auth'
export * from './user'
export * from './waiting'
export * from './email'
export * from './me'
export * from './team'

export const Modules = [AuthModule, EmailModule, UserModule, MeModule, TeamModule, WaitingModule]
