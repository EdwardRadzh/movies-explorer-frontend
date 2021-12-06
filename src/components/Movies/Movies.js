import './Movies.css';
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import * as movieApi from '../../utils/MoviesApi';
import { filterMovies, filterShortMovies, changeMovies } from '../../utils/utils';
import Preloader from '../Preloader/Preloader';

function Movies({
    movies, 
    setMovies, 
    savedMovies, 
    setSavedMovies, 
    searchMovie, 
    setSearchError, 
    handleToggleCheckbox,
    inputError, 
    searchError, 
    preloader,
}) {

    React.useEffect(() => {
        const searchResult = localStorage.getItem('search');
        if (searchResult && searchResult !== 'undefined' && JSON.parse(searchResult).length > 0) {
            setMovies(JSON.parse(searchResult));
        }
    }, [setMovies]);

    React.useEffect(() => {
        setSearchError(false);
    }, []);

    return(
        <section className="movies">
            <SearchForm
            searchMovie={searchMovie}
            inputError={inputError}
            handleToggleCheckbox={handleToggleCheckbox}
            />
            {preloader && (<Preloader/>)}
            <h2 className={searchError ? 'movies__search-error' : 'movies__search-error movies__search-error-hidden'}>
                    Ничего не найдено!
            </h2>

            {movies ? 
            <MoviesCardList 
            setMovies={setMovies}
            movies={movies}
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
            // savedMovies={savedMoviesList}
            /> : null}
        </section>
    );
};

export default Movies;

// import './Movies.css';
// import React from 'react';
// import SearchForm from '../SearchForm/SearchForm';
// import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import * as movieApi from '../../utils/MoviesApi';
// import { filterMovies, filterShortMovies, changeMovies } from '../../utils/utils';

// function Movies({
//   movies,
//   moviesError,
//   notFound,
//   handleSearchMovies,
//   handleShortMovies,
//   isShortMovies,
//   handleSaveMovie,
//   handleDeleteMovie,
// }) {
//     // const checkBox = localStorage.getItem('shortFilms') === 'on' ? 'on' : 'off';
//     // const [searchQuery, setSearchQuery] = React.useState('');
//     // const [shortFilms, setShortFilms] = React.useState(checkBox);
    
//     // const [filteredMovies, setFilteredMovies] = React.useState([]);
//     // const [allMovies, setAllMovies] = React.useState([]);

//     // const [isNothingFound, setIsNothingFound] = React.useState(false);
//     // const [isMoviesLoaging, setIsMoviesLoaging] = React.useState(false);
//     // const [isError, setIsError] = React.useState(false);

//     // // фильтруем фильмы и устанавливаем их в хранилище
//     // function handleSetFilteredMovies(movies, query, checkbox) {
//     //     const movieList = filterMovies(movies, query);
//     //     setFilteredMovies(checkbox === 'on' ? filterShortMovies(movieList) : movieList);
//     //     localStorage.setItem('movies', JSON.stringify(movieList));
//     // }

//     // // поиск фильма
//     // function handleSearchSubmit(value) {
//     //     setIsMoviesLoaging(true);
//     //     setSearchQuery(value);
//     //     localStorage.setItem('searchQqery', value);
//     //     localStorage.setItem('shortFilms', shortFilms);
//     //     if(!allMovies.length) {
//     //         movieApi.getMovies()
//     //         .then((data) => {
//     //             setAllMovies(data)
//     //             handleSetFilteredMovies(data, value, shortFilms)
//     //         })
//     //         .catch((err) => {
//     //             setIsError(true);
//     //             console.log(err);
//     //         })
//     //         .finally(() => setIsMoviesLoaging(false))
//     //     } else {
//     //         handleSetFilteredMovies(allMovies, value, shortFilms);
//     //         setIsMoviesLoaging(false);
//     //     }
//     // }

//     // // обработчик клика по чекбоксу
//     // function handleFilterCheckBox(e) {
//     //     setShortFilms(e.target.value);
//     //     localStorage.setItem('shortFilms', e.target.value);
//     // }

//     // // установка знаения, когда ничего не найдено
//     // function handleCheckFilteredMovies(arr) {
//     //     arr.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false)
//     // }

//     // // проверка наличия данных в хранилище
//     // React.useEffect(() => {
//     //     const data = JSON.parse(localStorage.getItem('movies'));
//     //     if (data && !searchQuery) {
//     //         setShortFilms(localStorage.getItem('shortFilms'))
//     //         setFilteredMovies(shortFilms === 'on' ? filterShortMovies(data) : data)
//     //         handleCheckFilteredMovies(data)
//     //     }
//     // }, [shortFilms, searchQuery]);

//     // // новый запрос
//     // React.useEffect(() => {
//     //     if(searchQuery) {
//     //         const data = filterMovies(allMovies, searchQuery, shortFilms);
//     //         setFilteredMovies(data)
//     //         handleCheckFilteredMovies(data)
//     //     }
//     // }, [shortFilms, searchQuery, allMovies])

//     return(
//         <section className="movies">
//             <SearchForm
//             handleSearchMovies={handleSearchMovies}
//             isShortMovies={isShortMovies}
//             handleShortMovies={handleShortMovies}
//             />
//             <MoviesCardList 
//             isLoading={isLoading}
//             movies={movies}
//             moviesError={moviesError}
//             notFound={notFound}
//             handleSaveMovie={handleSaveMovie}
//             handleDeleteMovie={handleDeleteMovie}
//             />
//         </section>
//     );
// };

// export default Movies;