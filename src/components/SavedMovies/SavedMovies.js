import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React from 'react';
import mainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';

function SavedMovies({ setSavedMovies, savedMovies, handleToggleCheckbox, searchMovie,
    inputError, preloader, searchError, onMovieDelete, setSearchError }) {

    React.useEffect(() => {
        mainApi.getSavedMovies(localStorage.getItem('jwt'))
            .then((res) => {
                setSavedMovies(res);
            })
    }, []);

    React.useEffect(() => {
        setSearchError(false);
    }, []);
//   const [searchQuery, setSearchQuery] = React.useState('');
//   const [shortFilms, setShortFilms] = React.useState('off');
  
//   const [filteredMovies, setFilteredMovies] = React.useState(list);
  
//   const [isNothingFound, setIsNothingFound] = React.useState(false);

//   function handleSearchSubmit(value) {
//       setSearchQuery(value);
//       const resultList = filterMovies(list, searchQuery, shortFilms)
//       setFilteredMovies(resultList)
//   }

//   function handleFilterCheckBox(e) {
//     setShortFilms(e.target.value);
//   };

//   React.useEffect(() => {
//         const arr = filterMovies(list, searchQuery, shortFilms)
//         setFilteredMovies(arr)
//         if (searchQuery) {
//             arr.length === 0 ? setIsNothingFound(true) : setFilteredMovies(false);
//         }
//   }, [list, searchQuery, shortFilms])
    return (
        <section className="saved-movies">
            <SearchForm 
            searchMovie={searchMovie}
            inputError={inputError}
            handleToggleCheckbox={handleToggleCheckbox}
            />
            {preloader && <Preloader/>}
            <h2 className={searchError ? 'movies__search-error' : 'movies__search-error movies__search-error-hidden'}>
                    Ничего не найдено!
            </h2>
            <MoviesCardList
            setMovies={setSavedMovies} 
            movies={savedMovies} 
            onMovieDelete={onMovieDelete}
            />
        </section>
    );
};

export default SavedMovies;