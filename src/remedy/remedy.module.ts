import { Module } from '@nestjs/common';
import { RemedyController } from './remedy.controller';
import { RemedyService } from './remedy.service';

@Module({
  controllers: [RemedyController],
  providers: [RemedyService],
})
export class RemedyModule {}
