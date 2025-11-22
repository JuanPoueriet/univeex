import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { ExcursionsService } from './excursions.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('excursions')
export class ExcursionsController {
  constructor(private readonly excursionsService: ExcursionsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createTourDto: Prisma.TourCreateInput) {
    return this.excursionsService.create(createTourDto);
  }

  @Get()
  findAll(
    @Query('city') city?: string,
    @Query('price') price?: string,
    @Query('date') date?: string,
  ) {
    const where: Prisma.TourWhereInput = {};
    if (city) where.city = { contains: city, mode: 'insensitive' };
    // Add other filters logic here

    return this.excursionsService.findAll({ where });
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.excursionsService.findOne(slug);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateTourDto: Prisma.TourUpdateInput) {
    return this.excursionsService.update({
      where: { id },
      data: updateTourDto,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.excursionsService.remove({ id });
  }
}
