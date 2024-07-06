import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RemedyModule } from './remedy/remedy.module';

@Module({
  imports: [UsersModule, RemedyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
