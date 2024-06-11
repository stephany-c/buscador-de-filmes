import React from 'react';

const WordList = ({ movies }) => {
  return (
    <ul className="list-group">
      {movies.map((movie, index) => (
        <li key={index} className="list-group-item">
          <h5>{movie.title}</h5>
          <p>{movie.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default WordList;
