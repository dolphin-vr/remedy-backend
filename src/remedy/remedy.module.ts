import { Module } from '@nestjs/common';
import { RemedyService } from './remedy.service';
import { RemedyController } from './remedy.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RemedyController],
  providers: [RemedyService],
})
export class RemedyModule {}
