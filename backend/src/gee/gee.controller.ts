import { Controller, Get, Param } from '@nestjs/common';
import { GeeService } from './gee.service';

@Controller('gee')
export class GeeController {
  constructor(private readonly geeService: GeeService) {}

  @Get()
  async test() {
    return 'GEE Controller is working!';
  }

  @Get('forest-loss/:year')
  async getForestLoss(@Param('year') year: number | string) {
    const result = await this.geeService.getForestLoss(year);
    return result;
  }

  @Get('landsat')
  async getLandsat() {
    const result = await this.geeService.getLandsat();
    return result;
  }
}
