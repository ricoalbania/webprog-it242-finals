import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // 1. Import this
import { GuestbookModule } from './guestbook/guestbook.module';

@Module({
  imports: [
    // 2. Add this to the top of your imports
    ConfigModule.forRoot({
      isGlobal: true, // This makes .env variables available everywhere
    }),
    GuestbookModule,
  ],
})
export class AppModule {}