/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RandomController } from './random.controller';
import { RandomService } from './random.service';

@Module({
  imports: [],
  controllers: [RandomController],
  providers: [RandomService],
})
export class RandomModule {}
