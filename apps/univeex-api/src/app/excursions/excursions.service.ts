import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Tour, Prisma } from '@prisma/client';

@Injectable()
export class ExcursionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TourCreateInput): Promise<Tour> {
    return this.prisma.tour.create({
      data,
    });
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TourWhereUniqueInput;
    where?: Prisma.TourWhereInput;
    orderBy?: Prisma.TourOrderByWithRelationInput;
  }): Promise<Tour[]> {
    const { skip, take, cursor, where, orderBy } = params || {};
    return this.prisma.tour.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { provider: true },
    });
  }

  async findOne(slug: string): Promise<Tour | null> {
    return this.prisma.tour.findUnique({
      where: { slug },
      include: { provider: true },
    });
  }

  async update(params: {
    where: Prisma.TourWhereUniqueInput;
    data: Prisma.TourUpdateInput;
  }): Promise<Tour> {
    const { where, data } = params;
    return this.prisma.tour.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.TourWhereUniqueInput): Promise<Tour> {
    return this.prisma.tour.delete({
      where,
    });
  }
}
