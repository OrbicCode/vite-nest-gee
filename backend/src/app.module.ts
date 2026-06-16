import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeeModule } from './gee/gee.module';

@Module({
  imports: [GeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
