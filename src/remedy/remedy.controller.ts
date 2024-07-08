import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RemedyService } from './remedy.service';
import { CreateRemedyDto } from './dto/create-remedy.dto';
import { UpdateRemedyDto } from './dto/update-remedy.dto';

@Controller('remedy')
export class RemedyController {
  constructor(private readonly remedyService: RemedyService) {}

  @Post()
  create(@Body() createRemedyDto: CreateRemedyDto) {
    return this.remedyService.create(createRemedyDto);
  }

  @Get()
  findAll() {
    return this.remedyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.remedyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRemedyDto: UpdateRemedyDto) {
    return this.remedyService.update(+id, updateRemedyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.remedyService.remove(+id);
  }
}
