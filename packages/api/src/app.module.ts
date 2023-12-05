import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { WaitingModule, AuthModule, EmailModule, UserModule } from '@module'
import { Waiting, Verification, User } from '@entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'waiting',
      password: 'waiting',
      database: 'waiting',
      synchronize: true,
      entities: [Waiting, Verification, User],
    }),
    WaitingModule,
    AuthModule,
    EmailModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
