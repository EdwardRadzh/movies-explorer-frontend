import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { filterMovies } from '../../utils/utils';
import React from 'react';

function SavedMovies({ list, onDeleteClick, isError }) {

  const [searchQuery, setSearchQuery] = React.useState('');
  const [shortFilms, setShortFilms] = React.useState('off');
  
  const [filteredMovies, setFilteredMovies] = React.useState(list);
  
  const [isNothingFound, setIsNothingFound] = React.useState(false);

  function handleSearchSubmit(value) {
      setSearchQuery(value);
      const resultList = filterMovies(list, searchQuery, shortFilms)
      setFilteredMovies(resultList)
  }

  function handleFilterCheckBox(e) {
    setShortFilms(e.target.value);
  };

  React.useEffect(() => {
        const arr = filterMovies(list, searchQuery, shortFilms)
        setFilteredMovies(arr)
        if (searchQuery) {
            arr.length === 0 ? setIsNothingFound(true) : setFilteredMovies(false);
        }
  }, [searchQuery, shortFilms, list])
    return (
        <section className="saved-movies">
            <SearchForm 
            onSearchClick={handleSearchSubmit}
            onCheckBox={handleFilterCheckBox}
            shortFilms={shortFilms}
            savedMoviesPage={true}/>
            <MoviesCardList
            savedMoviesPage={true}
            list={filteredMovies}
            onDelete={onDeleteClick}
            isError={isError}/>
        </section>
    );
};

export default SavedMovies;