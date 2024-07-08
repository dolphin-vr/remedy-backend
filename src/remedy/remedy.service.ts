import { Injectable } from '@nestjs/common';
import { CreateRemedyDto } from './dto/create-remedy.dto';
import { UpdateRemedyDto } from './dto/update-remedy.dto';

@Injectable()
export class RemedyService {
  create(createRemedyDto: CreateRemedyDto) {
    return 'This action adds a new remedy';
  }

  findAll() {
    return `This action returns all remedy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} remedy`;
  }

  update(id: number, updateRemedyDto: UpdateRemedyDto) {
    return `This action updates a #${id} remedy`;
  }

  remove(id: number) {
    return `This action removes a #${id} remedy`;
  }
}
