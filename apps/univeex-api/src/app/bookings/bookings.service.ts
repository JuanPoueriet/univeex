import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Booking, Prisma } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BookingCreateInput): Promise<Booking> {
    return this.prisma.booking.create({
      data,
    });
  }

  async findAllForUser(userId: string): Promise<Booking[]> {
    return this.prisma.booking.findMany({
      where: { userId },
      include: { tour: true },
    });
  }

  async findOne(id: string): Promise<Booking | null> {
    return this.prisma.booking.findUnique({
      where: { id },
      include: { tour: true, user: true },
    });
  }
}
