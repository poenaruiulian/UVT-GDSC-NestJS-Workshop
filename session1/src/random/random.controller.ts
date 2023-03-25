import {Controller, Get} from '@nestjs/common';
import { RandomService } from './random.service';

@Controller('random')
export class RandomController{
  constructor(private readonly randomService: RandomService) {}
    @Get('quote')
    message(): string{
      return this.randomService.quote();
    }
    @Get("dogphoto")
    dogPhoto(){
      return this.randomService.dogPhoto()
    }

}