import './MoviesCard.css';

function MoviesCard({img}) {
    return (
        <article className="movie">
            <a className="movie__link" href="#">
                <img className="movie__pic" src={img} alt="film-name"/>
            </a>
            <div className="movie__header">
                <div className="movie__info">
                    <div className="movie__text-wrap">
                        <h2 className="movie__title">33 слова о дизайне</h2>
                        <p className='movie__duration'>1ч 47м</p>
                    </div>
                    <button className="movie__btn movie__save-btn" type="button" aria-label="Добавить в избранное"/>
                </div>
            </div>
        </article>
    );
};

export default MoviesCard;