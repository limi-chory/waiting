import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder().setTitle('My API').setDescription('The description of my API').setVersion('1.0').addBearerAuth().build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-doc', app, document)

  app.enableCors()

  await app.listen(4000)
}
bootstrap()
