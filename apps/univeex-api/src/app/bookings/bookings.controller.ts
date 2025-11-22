import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('bookings')
@UseGuards(AuthGuard('jwt'))
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() createBookingDto: Prisma.BookingCreateInput, @Request() req: any) {
      // In a real app, we'd validate the user and override the userId from the token
      // createBookingDto.user = { connect: { id: req.user.userId } };
      return this.bookingsService.create(createBookingDto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.bookingsService.findAllForUser(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }
}
