import { Injectable } from '@nestjs/common';

const quotes = [
    "Iarna nu e ca vara",
    "Daca dragoste nu e, nimic nu e",
    "Viata e grele cand nu ai ce invarti"
]


@Injectable()
export class RandomService {
    quote(): string {
        let x = Math.floor(Math.random() * 3);
        return quotes[x];
    }

    dogPhoto(){
        return ""
    }

}