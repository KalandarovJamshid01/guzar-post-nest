import { Module } from '@nestjs/common';
import { QuartersService } from './quarters.service';
import { QuartersController } from './quarters.controller';

@Module({
  controllers: [QuartersController],
  providers: [QuartersService],
})
export class QuartersModule {}
