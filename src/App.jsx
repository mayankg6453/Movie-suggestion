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
const [totalPages,setTotalPages] = useState(1000);
const [currentPage,setCurrentPage] = useState(1);

useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])



const fetchMovies = async( query ='') =>{

  setIsLoading(true);
  setErrorMessage('');
  try{
    // console.log("from fetching:",currentPage)
    const endpoint = query?
    `${API_BASE_URL}/search/movie?query=${encodeURI(query)}&page=${currentPage}`
    :`${API_BASE_URL}/discover/movie?page=${currentPage}&sort_by=popularity.desc`;
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
    // console.log(endpoint);
    // console.log(data);
    setTotalPages(data.total_pages);
    // console.log(totalPages);
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

const handlePageIndexChange =(event) =>{
  let newValue = event.target.value;
  if (newValue === "" || isNaN(newValue)) {
    newValue = 1;
  } else {
    newValue = parseInt(newValue, 10);
  }

       // Clamp the value to the allowed range
       newValue = Math.max(1, Math.min(newValue, totalPages));

       setCurrentPage(newValue);
} 
useEffect(()=>{
  setCurrentPage(1); 
  fetchMovies(debouncedSearchTerm);
},[debouncedSearchTerm]);

useEffect(()=>{
  loadTrendingMovies();
},[])
useEffect(()=>{
  fetchMovies(debouncedSearchTerm);
},[currentPage])
const moveRight = () =>{
  setCurrentPage((prevPage) => prevPage + 1);
  // console.log("current page",currentPage);
  
}
const moveLeft = () =>{
  setCurrentPage((prevPage) => prevPage - 1);
  // console.log("current page",currentPage);
}

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
          <div className=" flex flex-row justify-between">

          <h2 className="mt-[40px]">Popular Movies</h2>
          <div className=" h-12 flex flex-row justify-between mt-10">

            <button onClick={moveLeft} disabled={currentPage === 1}>
              <img className=" w-12" src="./left.png" alt="left-arrow" />
            </button>

            <div className="flex flex-row items-center ">

              <input className="bg-light-100/5    text-gray-200 text-2xl rounded-lg  block w-12 p-2.5 appearance-none text-right"  type="number" value={currentPage} min="1" max={totalPages} onChange={handlePageIndexChange} />
              <p className="text-white items-center h-auto text-2xl text-center">/</p>
              
              <p className="text-gray-200 items-center h-auto text-2xl text-center text">{totalPages}</p>

            </div>

            <button onClick={moveRight} disabled={currentPage === totalPages}>
              <img className="w-12" src="./right.png" alt="right-arrow"/>
            </button>

          </div>
          </div>
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