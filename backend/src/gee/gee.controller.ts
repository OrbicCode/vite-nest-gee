import { Controller, Get } from '@nestjs/common';
import { GeeService } from './gee.service';

@Controller('gee')
export class GeeController {
  constructor(private readonly geeService: GeeService) {}

  @Get()
  async test() {
    return 'GEE Controller is working!';
  }

  @Get('landsat')
  async getLandsat() {
    const result = await this.geeService.getLandsat();
    return result;
  }
}
