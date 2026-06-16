import { Module } from '@nestjs/common';
import { GeeService } from './gee.service';
import { GeeController } from './gee.controller';

@Module({
  controllers: [GeeController],
  providers: [GeeService],
})
export class GeeModule {}
