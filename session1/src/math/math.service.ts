import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class MathService {
  substract(a,b): Number {
    return a-b;
  }
  add(a,b): Number{
    return a+b;
  }
  multiply(a,b): Number{
    return a*b;
  }

  divide(a,b): Number{
    if(!b){
        throw new HttpException("Division by zero", 400);
    }
    return a/b
  }

  operation(op, numbers){

    //plus verificarile adecvate de la inceput
    numbers = numbers.split(",")
    numbers = numbers.map(element => {
        element = +element;
    });

    const operations = {
        add: (a,b) => a+b,
        substract: (a,b) => a-b,
        multiply: (a,b) => a*b,
        divide: (a,b) => a/b
    }

    return numbers.reduce((total, currNumber) =>{
        return operations[op](+total, +currNumber);
    }, op == 'add'|| op == 'substract' ? 0 : op == 'multiply' ? 1 : numbers[0])
  }
}
