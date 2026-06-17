import { Controller, Get } from '@nestjs/common';
import { GeeService } from './gee.service';

@Controller('gee')
export class GeeController {
  constructor(private readonly geeService: GeeService) {}

  @Get()
  async test() {
    return 'gee route';
  }

  @Get('dummy')
  async getDummyData() {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos/1',
    );
    const data = await response.json();
    return data;
  }
}
