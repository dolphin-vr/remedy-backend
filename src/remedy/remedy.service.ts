import { Injectable } from '@nestjs/common';

@Injectable()
export class RemedyService {
  findAll(page: number, limit: number) {
    const remedies = [];
    const total = 0;
    return { remedies, total };
  }
}
