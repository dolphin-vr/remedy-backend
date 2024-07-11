import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { RemedyService } from './remedy.service';
import { Prisma } from '@prisma/client';
import { FindRemedyDto } from './dto/find-remedy.dto';

@SkipThrottle()
@Controller('remedy')
export class RemedyController {
  constructor(private readonly remedyService: RemedyService) {}

  @Post()
  addRemedy(@Body() createRemedyDto: Prisma.RemedyCreateInput) {
    return this.remedyService.addRemedy(createRemedyDto);
  }

  @SkipThrottle({ default: false })
  @Get()
  findRemedy(@Query() query: FindRemedyDto) {
    return this.remedyService.findRemedy(query);
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOneRemedy(@Param('id') id: number) {
    return this.remedyService.findOneRemedy(id);
  }

  @Patch(':id')
  updateRemedy(@Param('id') id: number, @Body() updateRemedyDto: Prisma.RemedyUpdateInput) {
    return this.remedyService.updateRemedy(+id, updateRemedyDto);
  }

  @Delete(':id')
  removeRemedy(@Param('id') id: number) {
    return this.remedyService.removeRemedy(id);
  }
}
