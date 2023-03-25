import { Module } from '@nestjs/common';
import { HelloWolrdModule } from './hello-world/hello-world.module';
import { MathModule } from './math/math.module';
import { MovieModule } from './movie/movie.module';


@Module({
  imports: [HelloWolrdModule,MathModule,MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
