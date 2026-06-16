import { Controller } from '@nestjs/common';
import { GeeService } from './gee.service';

@Controller('gee')
export class GeeController {
  constructor(private readonly geeService: GeeService) {}
}
