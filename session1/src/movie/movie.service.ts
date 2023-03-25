import { Injectable } from '@nestjs/common';
const movies = [
    {
        title:"Nu-mi da drumul 1",
        id: 1,
        rating: 9.7,
        actors:["Damian", "Iulian", "Iulian"]
    },
    {
        title:"Lupta 3",
        id:2,
        rating: 6.5,
        actors:["Tipul1","Dude","Gagica hot"]
    }
]
@Injectable()
export class MovieService {
    getMovies(){
        return movies.map(e =>({title:e.title,id:e.id}));
    }
    getMoviesSorted(sort){
        if(sort==="asc"){
                let aux = movies.sort(function(a, b) {
                var textA = a.title.toUpperCase();
                var textB = b.title.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            return aux.map(e=>({title:e.title,id:e.id}))
        }else if(sort==="desc"){
            let aux = movies.sort(function(a, b) {
                var textA = a.title.toUpperCase();
                var textB = b.title.toUpperCase();
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            });
            return aux.map(e=>({title:e.title,id:e.id}))
        }else{
            return movies.map(e=>({title:e.title,id:e.id}))
        }
    }

    getSpecificMovie(id){
        return movies.find(el => el.id === +id);
    }
}
