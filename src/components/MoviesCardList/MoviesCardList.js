// import './MoviesCardList.css';
// import React from 'react';
// import MoviesCard from '../MoviesCard/MoviesCard';
// import { getSavedMovieCard } from '../../utils/utils';
// import Preloader from '../Preloader/Preloader';
// import { useWindowWidth } from '../../hooks/UseWindowWidth';

// function MoviesCardList(props) {

//     const [initialCardsAmount, setInitialCardsAmount] = React.useState(() => {
//         const screenWidth = window.innerWidth;
//         if (screenWidth < 720) {
//           return 5;
//         } else if (screenWidth < 920) {
//           return 8;
//         } else if (screenWidth < 1280) {
//           return 12;
//         } else if (screenWidth >= 1280) {
//           return 12;
//         }
//       });

//       const [addCardsAmount, setAddCardsAmount] = React.useState(() => {
//         const screenWidth = window.innerWidth;
//         if (screenWidth < 720) {
//           return 2;
//         } else if (screenWidth < 920) {
//           return 2;
//         } else if (screenWidth < 1280) {
//           return 3;
//         } else if (screenWidth >= 1280) {
//           return 4;
//         }
//       });

//       function handleResize() {
//         const screenWidth = window.innerWidth;
//         if (screenWidth < 720) {
//           setInitialCardsAmount(5);
//           setAddCardsAmount(2);
//         } else if (screenWidth < 920) {
//           setInitialCardsAmount(8);
//           setAddCardsAmount(2);
//         } else if (screenWidth < 1280) {
//           setInitialCardsAmount(12);
//           setAddCardsAmount(3);
//         } else if (screenWidth >= 1280) {
//           setInitialCardsAmount(12);
//           setAddCardsAmount(4);
//         }
//       }

//       function handleAddMovies() {
//         setInitialCardsAmount((prev) => prev + addCardsAmount);
//       }
      
//       const renderedMovies = props.movies.slice(0, initialCardsAmount);

//       React.useEffect(() => {
//         window.addEventListener("resize", handleResize);
//       }, []);
    


//     // const width = useWindowWidth();
//     // const [showList, setShowList] = React.useState([]);
//     // const [cardsShow, setCardsShow] = React.useState({sum: 0, more: 0});
//     // const [widthHolder, setWidthHolder] = React.useState(true);

//     // // устанавливаем кол-во карточек в зависимости от ширины экрана
//     // React.useEffect(() => {
//     //     if (width > 1331){
//     //         setCardsShow({sum: 8, more: 4});
//     //     } else if(width <= 1331 && width > 1027){
//     //         setCardsShow({ sum: 12, more: 3});
//     //     } else if (width <=1027 && width > 629){
//     //         setCardsShow({sum: 8, more: 2});
//     //     } else if (width <= 629){
//     //         setCardsShow({sum: 5, more: 2});
//     //     }
//     //     return () => setWidthHolder(false);  
//     // }, [width, widthHolder]);

//     // // массив карточек в разделе"Фильмы"
//     // React.useEffect(() => {
//     //     if(list.length && !savedMoviesPage){
//     //         const res = list.filter((item, index) => index < cardsShow.sum);
//     //         setShowList(res);
//     //     }
//     // }, [list, savedMoviesPage, cardsShow.sum]);

//     // // отрисовываем карточки для раздела "Фильмы"
//     // function getInitialMoviesCards() {
//     //     return showList.map((item) => {
//     //         const likedMovieCard = getSavedMovieCard(savedMovies, item.id);
//     //         const likedMovieId = likedMovieCard ? likedMovieCard._id : null;
//     //         return (
//     //             <MoviesCard 
//     //             key={item.id}
//     //             card={{ ...item, _id: likedMovieId}} // добавить _id: likedMovieId 
//     //             onLike={onLike}
//     //             onDelete={onDelete}
//     //             liked={likedMovieCard ? true : false}
//     //             />
//     //         )
//     //     })
//     // }

//     // // отрисовываем карточки в разделе "Сохранённые фильмы"
//     // function getSavedMoviesCards() {
//     //     console.log(list);
//     //     return list.map((item) => (
//     //         <MoviesCard 
//     //         key={item._id}
//     //         card={item}
//     //         savedPage={savedMoviesPage}
//     //         onDelete={onDelete}
//     //         />
//     //     ))
//     // }

//     // // кнопка "ещё"
//     // function handleClickMoreButton() {
//     //     const start = showList.length;
//     //     const end = start + cardsShow.more;
//     //     const remainder = list.length - start;

//     //     if(remainder > 0) {
//     //         const newCards = list.slice(start, end)
//     //         setShowList([...showList, ...newCards]);
//     //     }
//     // }

//     return (
//       <>
//       {props.isLoading && <Preloader />}
//       <span
//         className={`movies-card-list__span ${
//           !props.moviesError && "movies-card-list__span-hidden"
//         }`}
//       >
//         Во время запроса произошла ошибка. Возможно, проблема с соединением или
//         сервер недоступен.
//       </span>
//       <span
//         className={`movies-card-list__span ${
//           !props.notFound && "movies-card-list__span-hidden"
//         }`}
//       >
//         По указанному запросу ничего не найдено
//       </span>
//       <span
//         className={`movies-card-list__span ${
//           props.isSavedMovies && props.movies.length === 0
//             ? ""
//             : "movies-card-list__span-hidden"
//         }`}
//       >
//         Вы пока ничего не сохраняли
//       </span>
      
//         <section className="movies-list">        
//               <div className='movies-list__box'>
//                   {renderedMovies.map((movie) => {
//                       return (
//                           <MoviesCard
//                           key={props.isSavedMovies ? movie.movieId : movie.id}
//                           movie={movie}
//                           isSavedMovies={props.isSavedMovies}
//                           handleLikeClick={props.handleLikeClick}
//                           handleDeleteClick={props.handleDeleteClick}
//                           />
//                       )
//                   })}
//               </div>
//               <button
//               className={`movies-list__more-btn 
//               ${props.isSavedMovies ?
//               'movies-list__more-btn_hidden' : `${props.movies.length === renderedMovies.length ? 'movies-list__more-btn_hidden' : ''}`}`}
//               type="button"
//               aria-label="Показать еще"
//               onClick={handleAddMovies}
//               >
//               Ещё
//               </button>
//         </section>
//         </>

//     );
// };

// export default MoviesCardList;

import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { getSavedMovieCard } from '../../utils/utils';
import Preloader from '../Preloader/Preloader';
import { useWindowWidth } from '../../hooks/UseWindowWidth';

function MoviesCardList(props) {

    const [initialCardsAmount, setInitialCardsAmount] = React.useState(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 720) {
          return 5;
        } else if (screenWidth < 920) {
          return 8;
        } else if (screenWidth < 1280) {
          return 12;
        } else if (screenWidth >= 1280) {
          return 12;
        }
      });

      const [addCardsAmount, setAddCardsAmount] = React.useState(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 720) {
          return 2;
        } else if (screenWidth < 920) {
          return 2;
        } else if (screenWidth < 1280) {
          return 3;
        } else if (screenWidth >= 1280) {
          return 4;
        }
      });

      function handleResize() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 720) {
          setInitialCardsAmount(5);
          setAddCardsAmount(2);
        } else if (screenWidth < 920) {
          setInitialCardsAmount(8);
          setAddCardsAmount(2);
        } else if (screenWidth < 1280) {
          setInitialCardsAmount(12);
          setAddCardsAmount(3);
        } else if (screenWidth >= 1280) {
          setInitialCardsAmount(12);
          setAddCardsAmount(4);
        }
      }

      function handleAddMovies() {
        setInitialCardsAmount((prev) => prev + addCardsAmount);
      }
      
      const renderedMovies = props.movies.slice(0, initialCardsAmount);

      React.useEffect(() => {
        window.addEventListener("resize", handleResize);
      }, []);
    


    // const width = useWindowWidth();
    // const [showList, setShowList] = React.useState([]);
    // const [cardsShow, setCardsShow] = React.useState({sum: 0, more: 0});
    // const [widthHolder, setWidthHolder] = React.useState(true);

    // // устанавливаем кол-во карточек в зависимости от ширины экрана
    // React.useEffect(() => {
    //     if (width > 1331){
    //         setCardsShow({sum: 8, more: 4});
    //     } else if(width <= 1331 && width > 1027){
    //         setCardsShow({ sum: 12, more: 3});
    //     } else if (width <=1027 && width > 629){
    //         setCardsShow({sum: 8, more: 2});
    //     } else if (width <= 629){
    //         setCardsShow({sum: 5, more: 2});
    //     }
    //     return () => setWidthHolder(false);  
    // }, [width, widthHolder]);

    // // массив карточек в разделе"Фильмы"
    // React.useEffect(() => {
    //     if(list.length && !savedMoviesPage){
    //         const res = list.filter((item, index) => index < cardsShow.sum);
    //         setShowList(res);
    //     }
    // }, [list, savedMoviesPage, cardsShow.sum]);

    // // отрисовываем карточки для раздела "Фильмы"
    // function getInitialMoviesCards() {
    //     return showList.map((item) => {
    //         const likedMovieCard = getSavedMovieCard(savedMovies, item.id);
    //         const likedMovieId = likedMovieCard ? likedMovieCard._id : null;
    //         return (
    //             <MoviesCard 
    //             key={item.id}
    //             card={{ ...item, _id: likedMovieId}} // добавить _id: likedMovieId 
    //             onLike={onLike}
    //             onDelete={onDelete}
    //             liked={likedMovieCard ? true : false}
    //             />
    //         )
    //     })
    // }

    // // отрисовываем карточки в разделе "Сохранённые фильмы"
    // function getSavedMoviesCards() {
    //     console.log(list);
    //     return list.map((item) => (
    //         <MoviesCard 
    //         key={item._id}
    //         card={item}
    //         savedPage={savedMoviesPage}
    //         onDelete={onDelete}
    //         />
    //     ))
    // }

    // // кнопка "ещё"
    // function handleClickMoreButton() {
    //     const start = showList.length;
    //     const end = start + cardsShow.more;
    //     const remainder = list.length - start;

    //     if(remainder > 0) {
    //         const newCards = list.slice(start, end)
    //         setShowList([...showList, ...newCards]);
    //     }
    // }

    return (
      <>
      {props.isLoading && <Preloader />}
      <span
        className={`movies-card-list__span ${
          !props.moviesError && "movies-card-list__span-hidden"
        }`}
      >
        Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен.
      </span>
      <span
        className={`movies-card-list__span ${
          !props.notFound && "movies-card-list__span-hidden"
        }`}
      >
        По указанному запросу ничего не найдено
      </span>
      <span
        className={`movies-card-list__span ${
          props.isSavedMovies && props.movies.length === 0
            ? ""
            : "movies-card-list__span-hidden"
        }`}
      >
        Вы пока ничего не сохраняли
      </span>
      
        <section className="movies-list">        
              <div className='movies-list__box'>
                  {renderedMovies.map((movie) => {
                      return (
                          <MoviesCard
                          key={props.isSavedMovies ? movie.movieId : movie.id}
                          movie={movie}
                          isSavedMovies={props.isSavedMovies}
                          handleLikeClick={props.handleLikeClick}
                          handleDeleteClick={props.handleDeleteClick}
                          />
                      )
                  })}
              </div>
              <button
              className={`movies-list__more-btn 
              ${props.isSavedMovies ?
              'movies-list__more-btn_hidden' : `${props.movies.length === renderedMovies.length ? 'movies-list__more-btn_hidden' : ''}`}`}
              type="button"
              aria-label="Показать еще"
              onClick={handleAddMovies}
              >
              Ещё
              </button>
        </section>
        </>

    );
};

export default MoviesCardList;
