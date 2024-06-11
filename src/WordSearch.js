import React, { useState } from 'react';
import axios from 'axios';
import WordList from './WordList';
import '@fortawesome/fontawesome-free/css/all.min.css';

const WordSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = async (event) => {
    const query = event.target.value;
    setSearchTerm(query);

    if (query.length === 0) {
      setMovies([]);
      setError('');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`https://movie-search-mayrink-f7a46544.koyeb.app/api/query?q=${query}`);
      const fetchedMovies = response.data.map(movie => ({
        title: movie.title,
        description: movie.description
      }));
      setMovies(fetchedMovies);
    } catch (err) {
      setError('Failed to fetch data');
    }

    setLoading(false);
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
      <WordList movies={movies} />
    </div>
  );
};

export default WordSearch;
