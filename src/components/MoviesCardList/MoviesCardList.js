import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
    LARGE_WINDOW_WIDTH,
    MEDIUM_WINDOW_WIDTH,
    MOBILE_WINDOW_WIDTH,
    QUANTITY_FOR_LARGE,
    QUANTITY_FOR_MEDIUM,
    QUANTITY_FOR_MOBILE,
    MORE_QUANTITY_FOR_LARGE,
    MORE_QUANTITY_FOR_MEDIUM,
    MORE_QUANTITY_FOR_MOBILE,
} from "../../utils/constants";

function MoviesCardList({
    movies,
    pageSavedMovies,
    handleSaveMovie,
    handleDeleteMovie,
    savedMovies,
    isMoviesNotFound,
    isErrorServer,}) {

    function cardsNumber(windowWidth) {
        if (windowWidth >= LARGE_WINDOW_WIDTH)
          return { quantity: QUANTITY_FOR_LARGE, more: MORE_QUANTITY_FOR_LARGE };
        if (windowWidth >= MEDIUM_WINDOW_WIDTH)
          return { quantity: QUANTITY_FOR_MEDIUM, more: MORE_QUANTITY_FOR_MEDIUM };
        if (windowWidth >= MOBILE_WINDOW_WIDTH)
          return { quantity: QUANTITY_FOR_MOBILE, more: MORE_QUANTITY_FOR_MOBILE };
    };

    const [moviesCount, setMoviesCount] = React.useState(
        cardsNumber(window.innerWidth).quantity
    );
    
    React.useEffect(() => {
        const callbackWidth = () => {
          setTimeout(
            500,
            setMoviesCount(cardsNumber(window.innerWidth).quantity)
          );
        };
        window.addEventListener("resize", callbackWidth);
        return () => {
          window.removeEventListener("resize", callbackWidth);
        };
    }, []);

    function handleMoreCards() {
        setMoviesCount(Number(moviesCount) + cardsNumber(window.innerWidth).more);
    };

    return (
        <section className="movies-list">
            <span
            className={`movies-list__message ${!isMoviesNotFound ? "movies-list__message-hidden" : ""}`}
            >Ничего не найдено
            </span>
            <span
            className={`movies-list__message ${!isErrorServer ? "movies-list__message-hidden" : ""}`}
            >Во время запроса произошла ошибка. Возможно, проблема с соединением или
            сервер недоступен. Подождите немного и попробуйте ещё раз
            </span>  
            <span
            className={`movies-list__message ${pageSavedMovies && movies.length === 0 && !isMoviesNotFound ? "" : "movies-list__message-hidden"}`}
            >Список пуст
            </span> 
              <div className='movies-list__box'>
              {movies.slice(0, moviesCount).map((movie, i) => (
                    <MoviesCard
                        key={i}
                        movie={movie}
                        savedMovies={savedMovies}
                        pageSavedMovies={pageSavedMovies}
                        handleSaveMovie={handleSaveMovie}
                        handleDeleteMovie={handleDeleteMovie}
                    />
              ))}

              </div>
              {!pageSavedMovies ? (
                <button
                className={`${movies.length > moviesCount ?
                "movies-list__more-btn" :
                "movies-list__more-btn_hidden"}`}
                type="button"
                onClick={handleMoreCards}
                >Ещё
                </button>
              ) : null
              }
        </section>
    );
};

export default MoviesCardList;
