import React from 'react';

const WordList = ({ movies }) => {
  return (
    <div className="word-list">
      {movies.map((movie, index) => (
        <div key={index} className="movie-item">
          
          <h3><a
              href={`https://www.metacritic.com${movie.uri}`}
              target="_blank"
              rel="noopener noreferrer"
            > {movie.title} </a></h3>
          <p>{movie.description}</p>
          <p>Nota: {movie.avgscore} Ano: {movie.year}</p>
          <p>https://www.metacritic.com{movie.uri}</p>
        </div>
      ))}
    </div>
  );
};

export default WordList;
