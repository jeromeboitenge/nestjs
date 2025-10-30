import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  lecture: any;
  async onModuleInit() {
    // Connect to PostgreSQL when the app starts
    await this.$connect();
    console.log('✅ Connected to PostgreSQL Database');
  }

  async onModuleDestroy() {
    // Disconnect cleanly when app stops
    await this.$disconnect();
    console.log('❌ Disconnected from PostgreSQL Database');
  }
}
