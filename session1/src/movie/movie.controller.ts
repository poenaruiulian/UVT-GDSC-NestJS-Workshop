
import { Controller, Get, Param } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get("/getMovies")
  getMovies(): Pick<Movie, "id" | "title">[] {
    return this.movieService.getMovies();
  }

  @Get("/getMoviesOrdered?:sort")
  getMoviesSorted(@Query("sort") sort): Pick<Movie, "id" | "title">[]{
    return this.movieService.getMoviesSorted(sort);
  }

  @Get("/getSpecificMovie/:id")
  getSpecificMovie(@Param('id') id): Movie{
    return this.movieService.getSpecificMovie(id);
  }
}
