import { Controller, Get } from '@nestjs/common';
import { GeeService } from './gee.service';
import * as path from 'path';

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

  @Get('test-connection')
  async testConnection() {
    var ee = require('@google/earthengine');
    var privateKey = require(
      path.join(__dirname, '../../src/gee/.private-key.json'),
    );

    ee.data.authenticateViaPrivateKey(privateKey, runAnalysis, function (err) {
      if (err) {
        console.error('Authentication error:', err);
        return;
      }
      console.log('Authentication successful');
    });

    function runAnalysis() {
      ee.initialize(null, null, null, null, null, 'molten-temple-441717-i6');

      console.log('Running analysis...');
      // Your analysis code here
    }
  }
}
