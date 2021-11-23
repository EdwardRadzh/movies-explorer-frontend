import React from 'react';
import './MoviesCard.css';
import { getTimeFromMin } from '../../utils/utils';


function MoviesCard({ card, onLike, onDelete, liked, savedPage }) {

  //обработчик клика по кнопке лайка
  function handleLikeClick() {
    onLike(card);
  };

  //обработчик клика по кнопке удаления/дизлайка
  function handleDeleteClick() {
    onDelete(card);
  };

    return (
        <article className="movie">
            <a className="movie__link" href={card.trailer || card.trailerLink} target='_blank' rel='noreferrer'>
                <img className="movie__pic" src={savedPage ? `${card.image}` : `https://api.nomoreparties.co${card.image.url}`} alt="film-name"/>
            </a>
            <div className="movie__header">
                <div className="movie__info">
                    <div className="movie__text-wrap">
                        <h2 className="movie__title">{card.nameRU}</h2>
                        <p className='movie__duration'>{getTimeFromMin(card.duration)}</p>
                    </div>
                    <button className={`movie__btn ${savedPage ? 'movie__saved-btn' : 'movie__save-btn'} ${liked && !savedPage ? 'movie__save-btn_active' : ''}`} type="button" aria-label="Добавить в избранное" onClick={savedPage || liked ? handleDeleteClick : handleLikeClick}/>
                </div>
            </div>
        </article>
    );
};

export default MoviesCard;