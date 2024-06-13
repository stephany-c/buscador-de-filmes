import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import WordList from './WordList';
import '@fortawesome/fontawesome-free/css/all.min.css';

const WordSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovies = async (query) => {
    if (query.length === 0) {
      setMovies([]);
      setError('');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`https://movie-search-mayrink-f7a46544.koyeb.app/api/query?q=${query}`);
      const fetchedMovies = response.data.map(item => ({
        title: item.movie.title,
        description: item.movie.description,
        avgscore: item.movie.avg_score,
        year: item.movie.year,
        uri: item.movie.movie_uri
      }));

      if (fetchedMovies.length === 0) {
        setMovies([]);
        setError('');
      } else {
        setMovies(fetchedMovies);
      }

    } catch (err) {
      setError('Failed to fetch data');
    }

    setLoading(false);
  };

  // eslint-disable-next-line
  const debouncedFetchMovies = useCallback(debounce(fetchMovies, 500), []);

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    debouncedFetchMovies(query);
  };

  return (
    <div className="word-search">
      <div className="search-bar">
        <i className="fas fa-search search-icon"></i>
        <input
          type="text"
          className="search-input"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length === 0 && !loading && !error && <p>No results found</p>}
      <WordList movies={movies} />
    </div>
  );
};

export default WordSearch;
