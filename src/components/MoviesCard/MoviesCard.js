import React from 'react';
import './MoviesCard.css';
import { getTimeFromMin } from '../../utils/utils';
import mainApi from '../../utils/MainApi';
import {useHistory} from 'react-router-dom';
// import { useCallback, useEffect, useState } from "react-router-dom";


function MoviesCard({movie, movies, setMovies, savedMovies, setSavedMovies}) {
    const [isLiked, setIsLiked] = React.useState(false);
    const history = useHistory();

    function handleSaveMovie() {
        const jwt = localStorage.getItem("jwt")
        if (!isLiked) {
            mainApi.saveMovie(jwt, movie)
            .then((res) => {
                if (res._id) {
                    setSavedMovies([res, ...savedMovies]);
                    setIsLiked(true)
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
        if (isLiked) {
            const liked = savedMovies.find((card) => card.movieId === movie.id)
            mainApi.deleteMovie(liked._id, jwt)
            .then((res) => {
                if (res) {
                    setSavedMovies(savedMovies.filter((card) => card !== liked))
                    setIsLiked(false)
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    function removeMovie() {
        const jwt = localStorage.getItem('jwt');
        mainApi.removeMovieFromSaved(movie._id, jwt)
            .then((res) => {
                if (res) {
                    setMovies(movies.filter((item) => item._id !== movie._id));
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <article className="movie">
            <a className="movie__link" href={movie.trailer || movie.trailerLink} target='_blank' rel='noreferrer'>
                <img className="movie__pic" src={history.location.pathname === '/saved-movies' ? `${movie.image}` : `https://api.nomoreparties.co${movie.image.url}`} alt="film-name"/>
            </a>
            <div className="movie__header">
                <div className="movie__info">
                    <div className="movie__text-wrap">
                        <h2 className="movie__title">{movie.nameRU}</h2>
                        <p className='movie__duration'>{getTimeFromMin(movie.duration)}</p>
                    </div>
                    <button className={'movie__btn' + (isLiked ? 'movie__save-btn_active' : 'movie__save-btn') + (history.location.pathname === '/saved-movies' ? 'movie__saved-btn' : '')}
                    type="button" 
                    aria-label="Добавить в избранное" 
                    onClick=
                        {
                            history.location.pathname !== '/saved-movies' ? handleSaveMovie : removeMovie
                        }/>
                </div>
            </div>
        </article>
    );
};

export default MoviesCard;

// import React from 'react';
// import './MoviesCard.css';
// import { getTimeFromMin } from '../../utils/utils';
// // import { useCallback, useEffect, useState } from "react-router-dom";


// function MoviesCard(props) {
//     const [isSaved, setIsSaved] = React.useState(false);

//     const filmData = {
//         country: props.movie.country || "",
//         director: props.movie.director || "",
//         duration: props.movie.duration || 0,
//         year: props.movie.year || "Не указано",
//         description: props.movie.description || "",
//         image: `https://api.nomoreparties.co${props.movie.image?.url}`,
//         trailer: props.movie?.trailerLink,
//         nameRU: props.movie.nameRU || "",
//         nameEN: props.movie.nameEN || "",
//         thumbnail: `https://api.nomoreparties.co${props.movie.image?.formats?.thumbnail?.url}`,
//         movieId: props.movie.id,
//     };

//     const isLikedMovie = React.useCallback(() => {
//         if (localStorage.getItem("savedMovies")) {
//             let savedMovies = JSON.parse(localStorage.getItem("savedMovies"))
//             if (savedMovies.some((movie) => movie.nameRU === props.movie.nameRu)) {
//                 setIsSaved(true)
//             }
//         }
//     }, [props.movie.nameRu])

//   //обработчик клика по кнопке лайка
//   function handleSaveMovie() {
//     props.handleSaveMovie(filmData);
//     setIsSaved(true);
//   }

//   //обработчик клика по кнопке удаления/дизлайка
//   function handleDeleteMovie() {
//     setIsSaved(false);
//     props.handleDeleteMovie(props.movie._id);
//   }

//   React.useEffect(() => {
//     isLikedMovie();
//   }, [isLikedMovie]);

//     return (
//         <article className="movie">
//             <a className="movie__link" href={props.movie.trailer || props.movie.trailerLink} target='_blank' rel='noreferrer'>
//                 <img className="movie__pic" src={props.isSavedMovies ? props.movie.image : filmData.image} alt="film-name"/>
//             </a>
//             <div className="movie__header">
//                 <div className="movie__info">
//                     <div className="movie__text-wrap">
//                         <h2 className="movie__title">{props.movie.nameRU}</h2>
//                         <p className='movie__duration'>{getTimeFromMin(props.movie.duration)}</p>
//                     </div>
//                     <button className={`movie__btn ${isSaved ? 'movie__saved-btn' : 'movie__save-btn'} ${!isSaved ? 'movie__save-btn_active' : ''}`} 
//                     type="button" 
//                     aria-label="Добавить в избранное" 
//                     onClick={!isSaved ? handleSaveMovie : handleDeleteMovie}/>
//                 </div>
//             </div>
//         </article>
//     );
// };

// export default MoviesCard;