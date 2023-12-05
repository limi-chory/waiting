import { Injectable } from '@nestjs/common'

@Injectable()
export class WaitingService {
  getHello(): string {
    return 'Hello from ExampleService!'
  }
}
