import './App.css';
import React from 'react';
import { Route, Switch, useHistory, Redirect, useLocation } from 'react-router-dom';

import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import { AppContext } from "../../contexts/AppContext";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRout/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import { SUCCESSFUL_CODE } from '../../utils/constants';
// import auth from '../../utils/auth';
import * as moviesApi from '../../utils/MoviesApi';

function App() {

    const history = useHistory();
    const location = useLocation();

    const [isLoading, setIsLoading] = React.useState(false);
    // const [currentUser, setCurrentUser] = React.useState({});
    const [loggedIn, setLoggedIn] = React.useState(true);
    const [apiMovies, setApiMovies] = React.useState([]);
    const [isShortMovies, setIsShortMovies] = React.useState(false);
    const [savedMovies, setSavedMovies] = React.useState([]);
    // const [userData, setUserData] = React.useState('');
    const [isError, setIsError] = React.useState(false);
    const [movies, setMovies] = React.useState([]);
    const [tokenChecked, setTokenChecked] = React.useState(true);
    const [moviesError, setMoviesError] = React.useState(false);
    const [notFound, setNotFound] = React.useState(false);
    const [inputError, setInputError] = React.useState(false);
    const [searchError, setSearchError] = React.useState(false);
    const [isCheckBoxOpen, setIsCheckBoxOpen] = React.useState(false);
    const [preloader, setPreloader] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({
      name: "",
      email: "",
    });

    const [infoMessage, setInfoMessage] = React.useState({
        isShown: false,
        message: '',
        code: SUCCESSFUL_CODE,
      });

    function handleLoggedIn() {
        setLoggedIn(true)
    };

    // function handleLoginState(state) {
    //     setLoginState(state);
    // };

    // const tokenCheck = React.useCallback(() => {
    //   const token = localStorage.getItem("jwt");
    //   if (token) {
    //     setTokenChecked(false);
    //     setLoggedIn(true);
    //     mainApi
    //       .getContent(token)
    //       .then((res) => {
    //         if (res) {
    //           setCurrentUser({ ...res });
    //           setTimeout(() => {
    //             setTokenChecked(true);
    //           }, 100);
    //         }
    //       })
    //       .catch((err) => {
    //         localStorage.removeItem("jwt");
    //       });
    //   } else {
    //     setTokenChecked(true);
    //     setLoggedIn(false);
    //   }
    // }, []);

    // React.useEffect(() => {
    //   tokenCheck();
    // }, [tokenCheck]);

    React.useEffect(() => {
      const jwt = localStorage.getItem("jwt")

      if (jwt) {
        mainApi.checkToken(jwt)
        .then((res) => {
          if (res) {
            handleLoggedIn();
            setCurrentUser({ email: res.email, name: res.name})
          }
        })
      }
    }, [loggedIn])


    //   React.useEffect(() => {
    //     if (loggedIn) {
    //       history.push('/movies');
    //     }
    //   }, [history, loggedIn]);

    // React.useEffect(() => {
    //     mainApi.getUserData()
    //     .then((data) => {
    //         // handleLoggedIn();
    //         setCurrentUser(data)
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // }, [loggedIn]);

    // React.useEffect(() => {
    //     const savedMovies = localStorage.getItem('savedMovies');
    //     if(loggedIn) {
    //         mainApi.getUsersMovies()
    //         .then((data) => {
    //             setSavedMovies(data)
    //             localStorage.setItem('savedMovies', JSON.stringify(data));
    //             setIsError(false)
    //         })
    //         .catch((err) => {
    //             setIsError(true)
    //             console.log(err);
    //         })
    //     }
    // }, [loggedIn])



    
    // регистрация
    function signUp(name, email, password) {
        return mainApi.register(name, email, password)
            .then((res) => {
                if(res.ok) {
                    // setCurrentUser({ ...res })
                    signIn(email, password)
                }    
                    // handleLoggedIn()
                    // setUserData(res.name, res.email)
                   history.push('/movies')
                
            })
            .catch(({ message, statusCode }) => {
                setInfoMessage({
                    ...infoMessage,
                    isShown: true,
                    message,
                    code: statusCode,
                    type: 'register',
                })
            })
    }

    // авторизация
    function signIn(email, password) {
         mainApi.login(email, password)
            .then((res) => {
              if (res.token) {
                localStorage.setItem("jwt", res.token);
                mainApi.checkToken(res.token)
                .then((data) => {
                  setCurrentUser({ email: data.email, name: data.name})
                })
                .catch((err) => {
                  console.log(err);
                });
              }
              handleLoggedIn()
              history.push('/movies')
            })
            .catch(({ message, statusCode }) => {
                setInfoMessage({
                    ...infoMessage,
                    isShown: true,
                    message,
                    code: statusCode,
                    type: 'login',
                })
            })
    }

    // выход
    function signOut() {
      localStorage.clear();
      setLoggedIn(false);
      setCurrentUser({
        name: "",
        email: "",
      });
      setMovies([]);
      setSavedMovies([]);
      history.push("/");
  }

  // поиск по инпуту
  function searchMovie(query) {
    if (loggedIn) {
      const jwt = localStorage.getItem("jwt");
      if (history.location.pathname === '/movies') {
        if(!localStorage.getItem('movies')) {
          setPreloader(true);
          moviesApi.getMovies()
          .then((data) => {
            setMovies(filterMovies(data, query));
            const allMovies = JSON.stringify(data);
            localStorage.setItem('movies', allMovies)
          })
          .catch(() => setInputError(true))
          .finally(() => setPreloader(false));
        } else {
          const searchList = JSON.parse(localStorage.getItem('movies'))
          setMovies(filterMovies(searchList, query))
        }
      }
      if(history.location.pathname === '/saved-movies') {
        setPreloader(true);
        mainApi.getSavedMovies(jwt)
        .then((res) => {
          setSavedMovies(filterMovies(res, query))
          const saved = JSON.parse(res);
          localStorage.setItem('saved', saved)
        })
        .catch(() => setSearchError(true))
        .finally(() => setPreloader(false));
      }
    }
  }

  function filterMovies(data, query) {
    const searchList = data.filter((movie) => {
      if (movies.nameRu.toLowerCase().includes(query.toLowerCase())) {
        if ((movie.duration <= 40) && (isCheckBoxOpen)) {
          return movie
        }
        if ((movie.duration >= 40) && (!isCheckBoxOpen)) {
          return movie;
        }
        return false
      }
      return false
    })
    if (searchList.length === 0) {
      setSearchError(true);
    } else {
      setSearchError(false)
    }
    const searchResult = JSON.stringify(searchList)
    localStorage.setItem('query', searchResult)
    return searchList
  }

  React.useEffect(() => {
    if (localStorage.getItem('saved')) {
      setSavedMovies(JSON.parse(localStorage.getItem('saved')))
    }
  }, [history]);

  React.useEffect(() => {
    if (loggedIn) {
      if (!localStorage.getItem('saved')) {
        mainApi.getSavedMovies(localStorage.getItem("jwt"))
        .then((res) => {
          setSavedMovies(res)
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }
  }, [savedMovies, history]);

  React.useEffect(() => {
    if (savedMovies) {
      localStorage.setItem('saved', JSON.stringify(savedMovies))
    }
  }, [savedMovies])

  // обработчик поиска по чекбоксу

  function handleToggleCheckbox() {
    setIsCheckBoxOpen(!isCheckBoxOpen);
  }



  // обработчик удаления фильма из избранного
  function handleDeleteMovie(movie){
    mainApi.deleteMovie(movie._id)
      .then(() => {
        const newMoviesList = savedMovies.filter((m) => m._id !== movie._id);
        setSavedMovies(newMoviesList);
        localStorage.setItem(
            "savedMovies",
            JSON.stringify(newMoviesList)
          );
      })
      .catch(err => console.log(err))
  };

  // редактирование профиля
  function handleUpdateUser(name, email) {
        mainApi.setUserData(name, email)
        .then((data) => {
            setCurrentUser(data);
            setInfoMessage({
                ...infoMessage,
                isShown: true,
                type: 'profile',
            })
        })
        .catch(({ message, statusCode }) => {
            setInfoMessage({
              ...infoMessage,
              isShown: true,
              message,
              code: statusCode,
              type: 'profile',
            });
          })
  }

  function handleClickResetInfoMessage() {
    if (infoMessage.isShown){
      setInfoMessage({
        ...infoMessage,
        isShown: false,
        message: '',
        type: '',
        code: SUCCESSFUL_CODE,
      });
    }
  };

  // данные пользователя
  // React.useEffect(() => {
  //   const token = localStorage.getItem("jwt");
  //   if (loggedIn && token) {
  //     mainApi
  //       .getUserData()
  //       .then((data) => {
  //         setCurrentUser({ ...data });
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [loggedIn]);

  // Загрузка фильмов
  // React.useEffect(() => {
  //   const token = localStorage.getItem("jwt");
  //   if (loggedIn && token) {
  //     const movies = localStorage.getItem("movies");
  //     const savedMovies = localStorage.getItem("savedMovies");
  //     if (movies) {
  //       setMovies(JSON.parse(movies));
  //     }
  //     if (savedMovies) {
  //       setSavedMovies(JSON.parse(savedMovies));
  //     } else {
  //       mainApi
  //         .getUsersMovies()
  //         .then((res) => {
  //           setSavedMovies(res);
  //           localStorage.setItem("savedMovies", JSON.stringify(res));
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   }
  // }, [location, loggedIn]);

    
    return(
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
              <Header loggedIn={loggedIn}/>
                <Switch>

                <ProtectedRoute exact path="/movies"
                component={Movies}
                loggedIn={loggedIn}
                movies={movies}
                setMovies={setMovies}
                setSavedMovies={setSavedMovies}
                searchMovie={searchMovie}
                handleToggleCheckbox={handleToggleCheckbox}
                // handleShortMovies={handleShortMovies}
                // isShortMovies={isShortMovies}
                searchError={searchError}
                inputError={inputError}
                setSearchError={setSearchError}
                isCheckboxOpen={isCheckBoxOpen}
                preloader={preloader}
                // savedMovies={savedMovies}
                // onLikeClick={handleSaveMovie}
                // onDeleteClick={handleDeleteMovie}
                />

                <ProtectedRoute exact path="/saved-movies"
                component={SavedMovies}
                movies={savedMovies}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                setMovies={setMovies}
                searchMovie={searchMovie}
                inputError={inputError}
                // handleSearchSavedMovies={searchSavedMovies}
                searchError={searchError}
                setSearchError={setSearchError}
                preloader={preloader}
                // isShortMovies={isShortMovies}
                // onDeleteClick={handleDeleteMovie}
                // handleShortMovies={handleShortMovies}
                isCheckboxOpen={isCheckBoxOpen}
                loggedIn={loggedIn}
                // isError={isError}
                />

                <ProtectedRoute exact path ="/profile"
                component={Profile}
                onSignOut={signOut}
                onUpdate={handleUpdateUser}
                loggedIn={loggedIn}
                infoMessage={infoMessage}
                />
                
                <Route exact path="/">
                    <Main />
                </Route>

                <Route path='/signup'>
                  {loggedIn ? <Redirect to='/movies'/> : <Register onRegister={signUp} infoMessage={infoMessage} />}
                 </Route>

                <Route path='/signin'>
                    <Login onLogin={signIn} infoMessage={infoMessage} />
                </Route>

                <Route path="*">
                    <PageNotFound />
                </Route>

                </Switch>
                <Footer />

            </div>
        </CurrentUserContext.Provider>
    );
};

export default App;

// import "./App.css";
// import About from "../Main/Main";
// import Header from "../Header/Header";
// import Movies from "../Movies/Movies";
// import SavedMovies from "../SavedMovies/SavedMovies";
// import Profile from "../Profile/Profile";
// import NotFound from "../NotFound/NotFound";
// import Register from "../Register/Register";
// import Login from "../Login/Login";
// import Footer from "../Footer/Footer";
// import InfoTooltip from "../InfoTooltip/InfoTooltip";

// import {
//   statusEditMessage,
//   statusErrors,
//   statusErrorText,
//   statusLoadMessage,
//   statusSuccessMessage,
// } from "../../utils/constants";
// import statusSuccessImage from "../../images/success.svg";
// import statusErrorImage from "../../images/error.svg";

// import ProtectedRoute from "../ProtectedRout/ProtectedRoute";
// import { AppContext } from "../../contexts/AppContext";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// import mainApi from "../../utils/MainApi";
// import auth from "../../utils/auth";
// import * as moviesApi from "../../utils/MoviesApi";

// import { useState, useEffect, useCallback } from "react";
// import {
//   Switch,
//   Route,
//   useHistory,
//   useLocation,
//   Redirect,
// } from "react-router-dom";

// function App() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [loggedIn, setLoggedIn] = useState(true);
//   const [movies, setMovies] = useState([]);
//   const [apiMovies, setApiMovies] = useState([]);
//   const [savedMovies, setSavedMovies] = useState([]);
//   const [isShortMovies, setIsShortMovies] = useState(false);
//   const [moviesError, setMoviesError] = useState(false);
//   const [notFound, setNotFound] = useState(false);
//   const [tokenChecked, setTokenChecked] = useState(true);

//   const [infoTooltip, setInfoTooltip] = useState({
//     isOpen: false,
//     image: statusSuccessImage,
//     message: statusSuccessMessage,
//   });
//   const [currentUser, setCurrentUser] = useState({
//     _id: "",
//     name: "",
//     email: "",
//   });
//   const history = useHistory();
//   const location = useLocation();

//   //Функция работы прелоадера
//   function loadingPopup(value) {
//     setIsLoading(value);
//     setInfoTooltip({
//       ...infoTooltip,
//       isOpen: true,
//       image: false,
//       message: statusLoadMessage,
//     });
//   }

//   //функция закрытия прелоадера
//   const closePopup = useCallback(() => {
//     setInfoTooltip({
//       ...infoTooltip,
//       isOpen: false,
//     });
//   }, [infoTooltip]);

//   //функция обработки ошибок валидации в формах. получает форму и статус ошибки на вход,
//   //фильтрует ошибку и ее сообщение, передает ее в попап статуса
//   function handleError(form, statusError) {
//     const errors = statusErrors.filter((error) => error.name === form.name)[0]
//       .errors;
//     const statusErrorMessage = errors.filter(
//       (error) => error.status === statusError
//     )[0].message;
//     setInfoTooltip({
//       ...infoTooltip,
//       isOpen: true,
//       image: statusErrorImage,
//       message: statusErrorMessage || statusErrorText,
//     });
//   }

//   //функция логина
//   function handleLogin(event, email, password) {
//     loadingPopup(true);
//     auth
//       .authorize(email, password)
//       .then((data) => {
//         setIsLoading(false);
//         setInfoTooltip({ isOpen: false });
//         setLoggedIn(true);
//         setCurrentUser({ ...data });
//         history.push("/movies");
//       })
//       .catch((err) => 
//       handleError(event.target, err));
//   }

//   //функция регистрации
//   function handleRegister(event, name, email, password) {
//     loadingPopup(true);
//     auth
//       .register(name, email, password)
//       .then((data) => {
//         setCurrentUser({ ...data });
//         setIsLoading(false);
//         setInfoTooltip({
//           ...infoTooltip,
//           isOpen: true,
//           image: statusSuccessImage,
//           message: statusSuccessMessage,
//         });
//         setLoggedIn(true);
//         history.push("/movies");
//       })
//       .catch((err) => {
//         handleError(event.target, err);
//       });
//   }
//   //функция обновления юзера. записывает результат работы api в стейт текущего пользователя
//   function handleUpdateUser(event, name, email) {
//     loadingPopup(true);
//     mainApi
//       .editProfile(name, email)
//       .then((data) => {
//         setCurrentUser({ ...data });
//         setIsLoading(false);
//         setInfoTooltip({
//           ...infoTooltip,
//           isOpen: true,
//           image: statusSuccessImage,
//           message: statusEditMessage,
//         });
//       })
//       .catch((err) => {
//         handleError(event.target, err);
//       });
//   }

//   // Проверка токена при повторном посещении сайта.
//   // Добавлена проверка состояния tokenChecked в разметку. Если токен проверен, разрешается отрисовка компонентов страницы.
//   // Если токен есть в ЛХ, стейт loggedIn изменяется на true, и выполняется запрос за данными пользователя, затем по получении ответа изменяется
//   // стейт tokenCheсked, позволяя отрисовку. Если же токен в ЛХ отсутствует, стейт loggerIn становится false, не позволяя попасть на защищенные роуты
//   const tokenCheck = useCallback(() => {
//     const token = localStorage.getItem("jwt");
//     if (token) {
//       setTokenChecked(false);
//       setLoggedIn(true);
//       auth
//         .getContent(token)
//         .then((res) => {
//           if (res) {
//             setCurrentUser({ ...res });
//             setTimeout(() => {
//               setTokenChecked(true);
//             }, 100);
//           }
//         })
//         .catch((err) => {
//           localStorage.removeItem("jwt");
//         });
//     } else {
//       setTokenChecked(true);
//       setLoggedIn(false);
//     }
//   }, []);

//   useEffect(() => {
//     tokenCheck();
//   }, [tokenCheck]);

//   //Выход из аккаунта
//   function signOut() {
//     setLoggedIn(false);
//     setCurrentUser({
//       _id: "",
//       name: "",
//       email: "",
//     });
//     setApiMovies([]);
//     setMovies([]);
//     localStorage.removeItem("jwt");
//     localStorage.removeItem("savedMovies");
//     localStorage.removeItem("movies");
//     history.push("/");
//   }

//   //обработка работы чекбокса короткометражек
//   function handleShortMovies(event) {
//     setIsShortMovies(event.target.checked);
//   }

//   // функия поиска фильмов по запросу. получает массив фильмов и ключевое слово на вход, создает массив результатов поиска
//   // перебирает массив фильмов на наличие в поле фильма nameRU ключевого слова, далее, проверяет, включен ли чекбокс, и в зависимости от этого
//   // помещает в массив результатов обычные фильмы или короткометражки
//   function searchMoviesByKeyword(movies, keyword) {
//     let foundMovies = [];

//     movies.forEach((movie) => {
//       if (movie.nameRU.toLowerCase().indexOf(keyword) > -1) {
//         if (isShortMovies) {
//           movie.duration <= 40 && foundMovies.push(movie);
//         } else {
//           foundMovies.push(movie);
//         }
//       }
//     });
//     return foundMovies;
//   }

//   // общая функция поиска. обнуляет некоторые стейта, далее в зависимости от того, пришли ли фильмы с сервера, либо запрашивает их, записывает
//   // стейт apiMovies и на них вызвает функцию поиска по ключевому слову, либо сразу вызывает последнюю и записывает результат в локальное хранилище
//   function searchMovies(keyword) {
//     debugger;
//     setIsLoading(true);
//     setMovies([]);
//     setNotFound(false);
//     setMoviesError(false);
//     if (apiMovies.length === 0) {
//       moviesApi
//         .getMovies()
//         .then((foundMovies) => {
//           setApiMovies(foundMovies);
//           const searchResult = searchMoviesByKeyword(foundMovies, keyword);

//           if (searchResult.length === 0) {
//             setNotFound(true);
//             setMovies([]);
//           } else {
//             localStorage.setItem("movies", JSON.stringify(searchResult));
//             setMovies(JSON.parse(localStorage.getItem("movies")));
//           }
//         })
//         .catch(() => {
//           setMoviesError(true);
//           setMovies([]);
//         })
//         .finally(() => {
//           console.log("Finally");
//           setIsLoading(false);
//         });
//     } else {
//       const searchResult = searchMoviesByKeyword(apiMovies, keyword);

//       if (searchResult.length === 0) {
//         setMovies([]);
//         setIsLoading(false);
//         setNotFound(true);
//       } else if (searchResult.length !== 0) {
//         localStorage.setItem("movies", JSON.stringify(searchResult));
//         setMovies(JSON.parse(localStorage.getItem("movies")));
//         setIsLoading(false);
//       } else {
//         setMoviesError(true);
//         setMovies([]);
//       }
//     }
//   }

//   //функция сохранения (лайкания) фильмов. отправляет запрос на api, результат помещает в переменную, которая записывается в локальное хранилище,
//   //также обновляет стейт сохраненных фильмов
//   function saveMovie(movie) {
//     mainApi
//       .saveMovie(movie)
//       .then((data) => {
//         const movies = [...savedMovies, data];
//         setSavedMovies((prevState) => [...prevState, data]);
//         localStorage.setItem("savedMovies", JSON.stringify(movies));
//       })
//       .catch((err) => console.log(`Error: ${err}`));
//   }

//   // функция поиска по сохраненным фильмам. берет сохраненки из локального хранилища и вызывает на них функция поиска по ключевому слову, которое
//   // получает на вход. результат записывает в стейт.
//   function searchSavedMovies(keyword) {
//     const movies = JSON.parse(localStorage.getItem("savedMovies"));
//     const searchResult = searchMoviesByKeyword(movies, keyword);
//     setSavedMovies(searchResult);
//   }

//   // функция удаления фильмов. получает id фильма на удаление, вызвает api, затем фильтрует массив сохраненок по id, новые данные помещает в стейт
//   // и локальное хранилище
//   function deleteMovie(movieId) {
//     mainApi
//       .deleteMovie(movieId)
//       .then(() => {
//         const filteredSavedMovies = savedMovies.filter((item) => {
//           return item._id !== movieId;
//         });
//         setSavedMovies(filteredSavedMovies);
//         localStorage.setItem(
//           "savedMovies",
//           JSON.stringify(filteredSavedMovies)
//         );
//       })
//       .catch((err) => console.log(`Error: ${err}`));
//   }

//   // Загрузка данных пользователя
//   useEffect(() => {
//     const token = localStorage.getItem("jwt");
//     if (loggedIn && token) {
//       mainApi
//         .getUserInfo()
//         .then((data) => {
//           setCurrentUser({ ...data });
//         })
//         .catch((err) => console.log(err));
//     }
//   }, [loggedIn]);

//   // Загрузка фильмов. Некоторые запросы уходили раньше, чем определяось состояние loggedIn в вышеописанном useEffect. Это приводило к появлению
//   // ошибки 401, когда действия, требующие наличия токена, выполнялись без него. Поправлено.
//   useEffect(() => {
//     const token = localStorage.getItem("jwt");
//     if (loggedIn && token) {
//       const movies = localStorage.getItem("movies");
//       const savedMovies = localStorage.getItem("savedMovies");
//       if (movies) {
//         setMovies(JSON.parse(movies));
//       }
//       if (savedMovies) {
//         setSavedMovies(JSON.parse(savedMovies));
//       } else {
//         mainApi
//           .getSavedMovies()
//           .then((res) => {
//             setSavedMovies(res);
//             localStorage.setItem("savedMovies", JSON.stringify(res));
//           })
//           .catch((err) => console.log(err));
//       }
//     }
//   }, [location, loggedIn]);

//   return (
//     <AppContext.Provider value={{ loggedIn, handleLogin, signOut }}>
//       <CurrentUserContext.Provider value={currentUser}>
//         <div className="page">
//           {tokenChecked && (
//             <Switch>
//               <Route path="/signup">
//                 {!loggedIn ? ( //если пользователь авторизирован, попасть на страницы регистрации и логина нельзя
//                   <Register
//                     handleRegister={handleRegister}
//                     handleError={handleError}
//                   />
//                 ) : (
//                   <Redirect to="/" />
//                 )}
//               </Route>
//               <Route path="/signin">
//                 {!loggedIn ? (
//                   <Login handleLogin={handleLogin} handleError={handleError} />
//                 ) : (
//                   <Redirect to="/" />
//                 )}
//               </Route>
//               <ProtectedRoute path="/profile">
//                 <Header isLogin={loggedIn} />
//                 <Profile onUpdateUser={handleUpdateUser} />
//               </ProtectedRoute>
//               <ProtectedRoute path="/saved-movies">
//                 <Header isLogin={loggedIn} />
//                 <SavedMovies
//                   isLoading={isLoading}
//                   movies={savedMovies}
//                   moviesError={moviesError}
//                   notFound={notFound}
//                   handleSearchSavedMovies={searchSavedMovies}
//                   isShortMovies={isShortMovies}
//                   handleDeleteMovie={deleteMovie}
//                   handleShortMovies={handleShortMovies}
//                 />
//                 <Footer />
//               </ProtectedRoute>
//               <ProtectedRoute path="/movies">
//                 <Header isLogin={loggedIn} />
//                 <Movies
//                   isLoading={isLoading}
//                   movies={movies}
//                   moviesError={moviesError}
//                   notFound={notFound}
//                   handleSearchMovies={searchMovies}
//                   handleShortMovies={handleShortMovies}
//                   isShortMovies={isShortMovies}
//                   handleSaveMovie={saveMovie}
//                   handleDeleteMovie={deleteMovie}
//                 />
//                 <Footer />
//               </ProtectedRoute>
//               <Route exact path="/">
//                 <Header isLogin={loggedIn} />
//                 <About />
//                 <Footer />
//               </Route>
//               <Route path="*">
//                 <NotFound />
//               </Route>
//             </Switch>
//           )}
//           <InfoTooltip
//             isOpen={infoTooltip.isOpen}
//             isLoading={isLoading}
//             onClose={closePopup}
//             statusImage={infoTooltip.image}
//             statusMessage={infoTooltip.message}
//           />
//         </div>
//       </CurrentUserContext.Provider>
//     </AppContext.Provider>
//   );
// }

// export default App;