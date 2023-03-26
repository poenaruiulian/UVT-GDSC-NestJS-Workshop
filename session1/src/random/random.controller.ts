/* eslint-disable prettier/prettier */
import { Controller, Get, Res } from '@nestjs/common';
import { RandomService } from './random.service';

@Controller('random')
export class RandomController {
  constructor(private readonly randomService: RandomService) {}
  @Get('quote')
  message(): string {
    return this.randomService.quote();
  }
  @Get('dogphoto')
  async dogPhoto( @Res() res) {
    return this.randomService.dogPhoto(res)
  }
// eslint-disable-next-line prettier/prettier
}
