import { Global, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';

@Global()
@Module({
  imports: [CqrsModule, PrismaModule],
})
export class SharedModule {}
