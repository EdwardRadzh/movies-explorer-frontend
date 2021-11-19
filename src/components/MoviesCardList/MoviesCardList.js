import './MoviesCardList.css'
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { getSavedMovieCard } from '../../utils/utils';
import Preloader from '../Preloader/Preloader';
import { useWindowWidth } from '../../hooks/UseWindowWidth';

function MoviesCardList({
    isLoading,
    list,
    isEmptyList,
    isError,
    onLike,
    onDelete,
    savedMovies,
    savedMoviesPage
}) {
    console.log( "props", 
        list,
        onLike,
        );

    const width = useWindowWidth();
    const [showList, setShowList] = React.useState([]);
    const [cardsShow, setCardsShow] = React.useState({sum: 0, more: 0});
    const [widthHolder, setWidthHolder] = React.useState(true);

    // устанавливаем кол-во карточек в зависимости от ширины экрана
    React.useEffect(() => {
        if (width > 1331){
            setCardsShow({sum: 8, more: 4});
        } else if(width <= 1331 && width > 1027){
            setCardsShow({ sum: 12, more: 3});
        } else if (width <=1027 && width > 629){
            setCardsShow({sum: 8, more: 2});
        } else if (width <= 629){
            setCardsShow({sum: 5, more: 2});
        }
        return () => setWidthHolder(false);  
    }, [width, widthHolder]);

    // массив карточек в разделе"Фильмы"
    React.useEffect(() => {
        if(list.length && !savedMoviesPage){
            const res = list.filter((item, index) => index < cardsShow.sum);
            setShowList(res);
        }
    }, [list, savedMoviesPage, cardsShow.sum]);

    // отрисовываем карточки для раздела "Фильмы"
    function getInitialMoviesCards() {
        console.log('шоулист', showList);
        return showList.map((item) => {
            // const likedMovieCard = getSavedMovieCard(savedMovies, item.id);
            // const likedMovieId = likedMovieCard ? likedMovieCard._id : null;
            return (
                <MoviesCard 
                key={item.id}
                card={{ ...item}} // добавить _id: likedMovieId 
                onLike={onLike}
                onDelete={onDelete}
                // liked={likedMovieCard ? true : false}
                />
            )
        })
    }

    // отрисовываем карточки в разделе "Сохранённые фильмы"
    function getSavedMoviesCards() {
        return list.map((item) => (
            <MoviesCard 
            key={item.id}
            card={item}
            savedPage={savedMoviesPage}
            onDelete={onDelete}
            />
        ))
    }

    // кнопка "ещё"
    function handleClickMoreButton() {
        const start = showList.length;
        const end = start + cardsShow.more;
        const remainder = list.length - start;

        if(remainder > 0) {
            const newCards = list.slice(start, end)
            setShowList([...showList, ...newCards]);
        }
    }

    return (
        <section className="movies-list">
            {isLoading ? (
                <Preloader />
            ) : (
                isEmptyList || isError ? (
                    <p className={`movies-list__message ${isError && 'movies-list__message_type_error'}`}>
                        {isError ? `Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз` : 'Ничего не найдено'}
                    </p>
                ) : (
                    <>
                    <div className='movies-list__box'>
                        {savedMoviesPage ? getSavedMoviesCards() : getInitialMoviesCards()}
                    </div>
                    <button
                    className={`movies-list__more-btn 
                    ${(savedMoviesPage || isEmptyList || showList.length === list.length) &&
                    'movies-list__more-btn_hidden'}`}
                    type="button"
                    aria-label="Показать еще"
                    onClick={handleClickMoreButton}
                    >
                    Ещё
                    </button>
                    </>
                )
            )
        }
        </section>
    );
};

export default MoviesCardList;
