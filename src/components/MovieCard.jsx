import React from 'react'

const MovieCard = ({movie : {title, vote_average, poster_path, release_date,
    original_language
 }}) => {

    
  return (
    <div className='movie-card shadow-lg transition-transform duration-300 ease-in-out hover:scale-95 hover:shadow-xl '>
        <img  src={poster_path? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt="title" />
        <div>
            <h3 className='mt-4'>{title}</h3>
            <div className='content'>
                <div className='rating'>
                    <img src="/star.svg" alt="star icon" />
                    <p>{vote_average? vote_average.toFixed(1): 'N/A'}</p>
                </div>
                <span>•</span>
                <div className='lang'>{original_language}</div>
                <span>•</span>
                <p className='year'>
                    {release_date ? release_date.split('-')[0]:'N/A'}
                </p>
            </div>
        </div>
    </div>


  )
}

export default MovieCard