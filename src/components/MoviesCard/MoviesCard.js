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
//   function handleLikeClick() {
//     props.handleLikeClick(filmData);
//     setIsSaved(true);
//   };

//   //обработчик клика по кнопке удаления/дизлайка
//   function handleDeleteClick() {
//     setIsSaved(false);
//     props.handleDeleteClick(props.movie._id);
//   };

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
//                     <button className={`movie__btn ${props.isSavedMovies ? 'movie__saved-btn' : 'movie__save-btn'} ${!isSaved ? 'movie__save-btn_active' : ''}`} 
//                     type="button" 
//                     aria-label="Добавить в избранное" 
//                     onClick={isSaved ? handleDeleteClick : handleLikeClick}/>
//                 </div>
//             </div>
//         </article>
//     );
// };

// export default MoviesCard;

import React from 'react';
import './MoviesCard.css';
import { getTimeFromMin } from '../../utils/utils';
// import { useCallback, useEffect, useState } from "react-router-dom";


function MoviesCard(props) {
    const [isSaved, setIsSaved] = React.useState(false);

    const filmData = {
        country: props.movie.country || "",
        director: props.movie.director || "",
        duration: props.movie.duration || 0,
        year: props.movie.year || "Не указано",
        description: props.movie.description || "",
        image: `https://api.nomoreparties.co${props.movie.image?.url}`,
        trailer: props.movie?.trailerLink,
        nameRU: props.movie.nameRU || "",
        nameEN: props.movie.nameEN || "",
        thumbnail: `https://api.nomoreparties.co${props.movie.image?.formats?.thumbnail?.url}`,
        movieId: props.movie.id,
    };

    const isLikedMovie = React.useCallback(() => {
        if (localStorage.getItem("savedMovies")) {
            let savedMovies = JSON.parse(localStorage.getItem("savedMovies"))
            if (savedMovies.some((movie) => movie.nameRU === props.movie.nameRu)) {
                setIsSaved(true)
            }
        }
    }, [props.movie.nameRu])

  //обработчик клика по кнопке лайка
  function handleSaveMovie() {
    props.handleSaveMovie(filmData);
    setIsSaved(true);
  }

  //обработчик клика по кнопке удаления/дизлайка
  function handleDeleteMovie() {
    setIsSaved(false);
    props.handleDeleteMovie(props.movie._id);
  }

  React.useEffect(() => {
    isLikedMovie();
  }, [isLikedMovie]);

    return (
        <article className="movie">
            <a className="movie__link" href={props.movie.trailer || props.movie.trailerLink} target='_blank' rel='noreferrer'>
                <img className="movie__pic" src={props.isSavedMovies ? props.movie.image : filmData.image} alt="film-name"/>
            </a>
            <div className="movie__header">
                <div className="movie__info">
                    <div className="movie__text-wrap">
                        <h2 className="movie__title">{props.movie.nameRU}</h2>
                        <p className='movie__duration'>{getTimeFromMin(props.movie.duration)}</p>
                    </div>
                    <button className={`movie__btn ${isSaved ? 'movie__saved-btn' : 'movie__save-btn'} ${!isSaved ? 'movie__save-btn_active' : ''}`} 
                    type="button" 
                    aria-label="Добавить в избранное" 
                    onClick={!isSaved ? handleSaveMovie : handleDeleteMovie}/>
                </div>
            </div>
        </article>
    );
};

export default MoviesCard;