/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

const quotes = [
  'Iarna nu e ca vara',
  'Daca dragoste nu e, nimic nu e',
  'Viata e grele cand nu ai ce invarti',
];

const images = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg'

]

@Injectable()
export class RandomService {
  quote(): string {
    const x = Math.floor(Math.random() * 3);
    return quotes[x];
  }

  dogPhoto(res) {
    const x = Math.floor(Math.random() * 3);
    const fileStream = fs.createReadStream('./src/random/images/'+images[x]);
    //res.setHeader('Content-Type', 'image/jpeg');
    fileStream.pipe(res);
  }
}
