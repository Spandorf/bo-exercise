import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import * as csv from 'fast-csv';
import { Decimal } from '@prisma/client/runtime';

const prisma = new PrismaClient()
interface Movie {
    budget: number;
    genres: Genre[];
    keywords: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    production_companies: Company[],
    production_countries: string,
    release_date: string | undefined,
    revenue: number,
    runtime: number,
    homepage: string,
    spoken_languages: string,
    status: string,
    tagline: string,
    title: string,
    vote_average: number,
    vote_count: number
};

interface Genre {
    id: number;
    name: string;
};

interface Company {
    id: number;
    name: string;
};

async function main() {
    
    let movies: Movie[] = await readMovies();
    for(var movie of movies){
        const newMovie = await prisma.movie.create({
            data: {
                title: movie.title,
                budget: movie.budget,
                homepage: movie.homepage,
                original_language: movie.original_language,
                original_title: movie.original_title,
                overview: movie.overview,
                popularity: movie.popularity,
                release_date: movie.release_date,
                revenue: movie.revenue,
                runtime: movie.runtime,
                status: movie.status,
                tagline: movie.tagline,
                vote_average: movie.vote_average,
                vote_count: movie.vote_count
            }
        });
        
        await Promise.all(movie.genres.map(async (genre) => { 
            await prisma.genre.create({
                data: {
                    movieId: newMovie.id,
                    name:  genre.name,
                    genre_id: genre.id
                }
            });  
        }));

        await Promise.all(movie.production_companies.map(async (company) => { 
            await prisma.company.create({
                data: {
                    movieId: newMovie.id,
                    name:  company.name,
                    company_id: company.id
                }
            });  
        }));

        
        for(var genre of movie.genres){
            await prisma.genre.create({
                data: {
                    movieId: newMovie.id,
                    name:  genre.name,
                    genre_id: genre.id
                }
            });  
        }

        for(var company of movie.production_companies){
            await prisma.company.create({
                data: {
                    movieId: newMovie.id,
                    name:  company.name,
                    company_id: company.id
                }
            });  
        }
        
    }
    console.log("Done");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

async function readMovies(): Promise<Movie[]>{  
    const results: Movie[] = [];
    return new Promise(function(resolve, reject) {
      fs.createReadStream('data/tmdb_5000_movies.csv')
        .pipe(csv.parse({ headers: true }))
        .on('error', error => reject(error))
        .on('data', (data) => {
            try {
                let genres: Genre[] = [];
                for(var item of JSON.parse(data.genres)){
                    let genre: Genre = {
                        id: item.id,
                        name: item.name
                    };
                    genres.push(genre);
                }
                let companies: Company[] = [];
                for(var item of JSON.parse(data.production_companies)){
                    let company: Company = {
                        id: item.id,
                        name: item.name
                    };
                    companies.push(company);
                }
                let releaseDate: Date = new Date(data.release_date);
                let movie: Movie = {
                    budget: Number(data.budget),
                    genres: genres,
                    keywords: data.keywords,
                    original_language: data.original_language,
                    original_title: data.original_title,
                    overview: data.overview,
                    popularity: data.popularity,
                    production_companies: companies,
                    production_countries: data.production_countries,
                    release_date: !isNaN(releaseDate.valueOf()) ? releaseDate.toISOString() : undefined,
                    revenue: Number(data.revenue),
                    runtime: Number(data.runtime),
                    spoken_languages: data.spoken_languages,
                    status: data.status,
                    tagline: data.tagline,
                    title: data.title,
                    vote_average: data.vote_average,
                    vote_count: Number(data.vote_count),
                    homepage: data.homepage
                };
              results.push(movie);
            } catch (error) {
              console.error("Error processing row");
            }
        })
        .on('end', () => {
          console.log("Read successful");
          resolve(results);
        });
    });
};