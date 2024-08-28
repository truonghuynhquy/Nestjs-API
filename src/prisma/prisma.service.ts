import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
// This service is used to connect DB
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          // We need to secure this !
          // url: 'postgresql://postgres:postgres@192.168.1.228:5432/testdb?schema=public',
          url: configService.get<string>('DATABASE_URL'),
        },
      },
    });
    console.log('DB URL: ' + configService.get('DATABASE_URL'));
  }
  cleanDatabase() {
    // In a 1 - N relation, delete N firstly, then delete "1"
    console.log('Clean Database');
    return this.$transaction([
      // 2 commands in ONE transaction
      this.user.deleteMany(),
      this.note.deleteMany(),
    ]);
  }
}
