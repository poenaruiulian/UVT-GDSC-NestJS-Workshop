
import { Controller, Get, Param } from '@nestjs/common';
import { MathService } from './math.service';

@Controller('math')
export class MathController {
  constructor(private readonly mathService: MathService) {}

  @Get('substract/:a/:b')
  substract(@Param('a') a, @Param('b') b): Number {
    return this.mathService.substract(a,b);
  }

  @Get('add/:a/:b')
  add(@Param('a') a, @Param('b') b): Number{
    return this.mathService.add(+a,+b);
  }

  @Get('multiply/:a/:b')
  multiply(@Param('a') a, @Param('b') b): Number{
    return this.mathService.multiply(+a,+b);
  }

  @Get('divide/:a/:b')
  divide(@Param('a') a, @Param('b') b): Number{
    return this.mathService.divide(+a,+b);
  }
  @Get("operation/:operation/:numbers")
  operation(@Param('operation') op, @Param('numbers') numbers): Number{
    return this.mathService.operation(op, numbers);
  }
}
