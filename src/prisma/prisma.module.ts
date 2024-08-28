import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // This module is used Globally
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Other modules can use PrismaService
})
export class PrismaModule {}
