import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { PaymentsController } from './payments.controller';

@Module({
  controllers: [BookingsController, PaymentsController],
  providers: [BookingsService],
})
export class BookingsModule {}
