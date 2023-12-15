import { AuthModule } from './auth'
import { EmailModule } from './email'
import { MeModule } from './me'
import { TeamModule } from './team'
import { UserModule } from './user'
import { ReportModule } from './report'

export * from './auth'
export * from './user'
export * from './report'
export * from './email'
export * from './me'
export * from './team'

export const Modules = [AuthModule, EmailModule, UserModule, MeModule, TeamModule, ReportModule]
