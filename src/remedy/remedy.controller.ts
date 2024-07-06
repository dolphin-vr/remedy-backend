import { Controller, Get, Query } from '@nestjs/common';
import { RemedyService } from './remedy.service';

@Controller('remedy')
export class RemedyController {
  constructor(private readonly remedyService: RemedyService) {}
  @Get()
  findAll(@Query('page') page: number) {
    return this.remedyService.findAll(page);
  }
}
