import { useState,useEffect } from "react"
import Search from "./components/Search.jsx"
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import {useDebounce} from 'react-use'
import { getTrendingMovies, updateSearchCount } from "./appwrite.js";
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_Key = import .meta.env.VITE_TMBD_API_KEY
const API_OPTIONS = {
  method : 'GET',
  headers:{
    accept: 'application/json',
    Authorization: `Bearer ${API_Key}`
  }
}

function App() {

const [searchTerm, setSearchTerm] =  useState('');
const [errorMessage, setErrorMessage] =  useState('');

const [trendingMovies, setTrendingMovies] = useState([]);

const [movieList,setMovieList] = useState([]);
const [isLoading, setIsLoading] = useState(false);

const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])



const fetchMovies = async( query ='') =>{

  setIsLoading(true);
  setErrorMessage('');
  try{
    const endpoint = query?
    `${API_BASE_URL}/search/movie?query=${encodeURI(query)}`
    :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint, API_OPTIONS);
    if(!response.ok){
      throw new Error ("Failed to fetch movies");
    }
    const data = await response.json();
    if(data.Response ==='False' ){
      setErrorMessage(data.error || 'Failed to fetch movies');
      setMovieList([]);
      return;

    }
    //console.log(data.results);
    setMovieList(data.results || []);
    if(query && data.results.length >0){
      await updateSearchCount(query,data.results[0]);
    }

  }
  catch(error){
    console.log(`Error fetching movies: ${error}`);
    setErrorMessage("Error while fetching movies, Plese try again later.")

  }
  finally{
    setIsLoading(false);
  }
 }

 const loadTrendingMovies = async () => {
  try {
    const movies = await getTrendingMovies();

    setTrendingMovies(movies);
  } catch (error) {
    console.error(`Error fetching trending movies: ${error}`);
  }
}
useEffect(()=>{
  fetchMovies(debouncedSearchTerm);
},[debouncedSearchTerm]);

useEffect(()=>{
  loadTrendingMovies();
},[])

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner"/>
          <h1 className=''>Find <span className="text-gradient">Movies </span>You'll Enjoy Without the Hassle</h1>
            {/* State fields can be sent as props */}
          <Search searchTerm={searchTerm} setSearchTerm = {setSearchTerm}/>
        </header>
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className="all-movies"> 


          <h2 className="mt-[40px]">Popular Movies</h2>
           {isLoading ? (
            <Spinner />): errorMessage ?(
              <p className="text-red-500">{errorMessage}</p>
            ):(
              <ul>
                {movieList.map((movie) =>(
                  <MovieCard key={movie.id} movie = {movie} />
                ))}
              </ul>
            )
           
          }
          {/* </div> */}
        </section>
        
      </div>

    </main>
  )
}

export default App


// echo "# movie-recomendation" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/mayankg6453/movie-recomendation.git
// git push -u origin main