import React from 'react';
import WordSearch from './WordSearch';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="mt-5">Buscador de filmes</h1>
        <WordSearch />
      </div>
    </div>
  );
}

export default App;
