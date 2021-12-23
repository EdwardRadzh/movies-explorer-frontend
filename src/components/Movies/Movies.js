import './Movies.css';
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({
  movies,
  toggleCheckbox,
  checkboxOn,
  handleSaveMovie,
  handleDeleteMovie,
  savedMovies,
  allSavedMovies,
  isMoviesNotFound,
  isErrorServer,
  handleSearchSubmit,
  isLoading,
}) {

    return(
        <section className="movies">
            <SearchForm
            handleSearchSubmit={handleSearchSubmit}
            toggleCheckbox={toggleCheckbox}
            checkboxOn={checkboxOn}
            />
            {isLoading ? (
            <Preloader/>
            ) : (
                <MoviesCardList 
                movies={movies}
                pageSavedMovies={false}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
                savedMovies={savedMovies}
                isMoviesNotFound={isMoviesNotFound}
                isErrorServer={isErrorServer}
                allSavedMovies={allSavedMovies}
                />
            )}
        </section>
    );
};

export default Movies;