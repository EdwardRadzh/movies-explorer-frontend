import React from 'react';
import './MoviesCard.css';
import { getTimeFromMin } from '../../utils/utils';

function MoviesCard({
    movie,
    savedMovies,
    pageSavedMovies,
    handleSaveMovie,
    handleDeleteMovie,}) {

    const isSaved = savedMovies.some((i) => i.movieId === movie.id);

    function onLike() {
        isSaved ? handleDeleteMovie(movie, pageSavedMovies) : handleSaveMovie(movie);
    }

    function onDelete() {
        handleDeleteMovie(movie, pageSavedMovies);
    }

    return (
        <article className="movie">
            <a className="movie__link" href={pageSavedMovies ? movie.trailer : movie.trailerLink} target='_blank' rel='noreferrer'>
                <img className="movie__pic" src={pageSavedMovies ? movie.image : `https://api.nomoreparties.co${movie.image.url}`} alt="film-name"/>
            </a>
            <div className="movie__header">
                <div className="movie__info">
                    <div className="movie__text-wrap">
                        <h2 className="movie__title">{movie.nameRU}</h2>
                        <p className='movie__duration'>{getTimeFromMin(movie.duration)}</p>
                    </div>
                    {pageSavedMovies ? (
                        <button
                        className="movie__btn movie__saved-btn"
                        type="button"
                        onClick={onDelete}
                        />
                    ) : (
                        <button
                        className={`movie__btn movie__save-btn ${isSaved ? "movie__save-btn_active" : ""}`}
                        type="button"
                        onClick={onLike}
                        />
                    )}
                </div>
            </div>
        </article>
    );
};

export default MoviesCard;