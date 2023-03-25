import { Module } from '@nestjs/common';
import { HelloWolrdModule } from './hello-world/hello-world.module';
import { MathModule } from './math/math.module';
import { MovieModule } from './movie/movie.module';
import {RandomModule} from "./random/random.module";


@Module({
  imports: [HelloWolrdModule,MathModule,MovieModule,RandomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
