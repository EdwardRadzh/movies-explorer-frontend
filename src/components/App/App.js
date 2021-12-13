import './App.css';
import React from 'react';
import { Route, Switch, useLocation, useHistory, Redirect } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRout/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import * as auth from "../../utils/auth";
import { getMovies } from '../../utils/MoviesApi'
import { SHORT_MOVIE_DURATION } from "../../utils/constants";

function App() {

  const history = useHistory();
  const { pathname } = useLocation();
  const token = localStorage.getItem("jwt");

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegisterError, setIsRegisterError] = React.useState("");
  const [isLoginError, setIsLoginError] = React.useState("");
  const [isEditProfileError, setIsEditProfileError] = React.useState("");
  const [isComplitedUpdate, setComplitedUpdate] = React.useState(false);
  const [isDataSent, setIsDataSent] = React.useState(false);
  const [isCheckboxOn, setIsCheckboxOn] = React.useState(false);
  const [isSavedCheckboxOn, setIsSavedCheckboxOn] = React.useState(false);

  const [isLoading, setLoading] = React.useState(false);
  const [isMoviesNotFound, setMoviesNotFound] = React.useState(false);
  const [isSavedMoviesNotFound, setIsSavedMoviesNotFound] = React.useState(false);
  const [isErrorServer, setErrorServer] = React.useState(false);
  const [allMovies, setAllMovies] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [allSavedMovies, setAllSavedMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

  React.useEffect(() => {
    if (token) {
      auth
        .checkToken(token)
        .then(() => setLoggedIn(true))
        .catch((err) => {
          console.log(err);
          history.push('/signin');
        });
    }
  }, [history, token]);

  // данные пользователя
  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserData(), mainApi.getSavedMovies()])
        .then(([userData, moviesData]) => {
          const userMovies = moviesData.filter(
            (movieItem) => movieItem.owner === userData._id
          );
          setCurrentUser(userData);
          setAllSavedMovies(userMovies);
          setSavedMovies(userMovies);

          if ("movies" in localStorage)
            setMovies(JSON.parse(localStorage.getItem("movies")));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    setComplitedUpdate(false);
  }, [pathname]);

  // регистрация
  function handleRegister(name, email, password) {
    auth.register(name, email, password)
      .then((res) => {
        handleLogin(email, password);
      })
      .catch((err) => {
        console.log(err);
        setIsRegisterError(err);
      })
      .finally(() => {
        setIsDataSent(false);
      });
  };

  // авторизация
  function handleLogin  (email, password) {
    auth.login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          history.push('/movies')
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoginError(err);
      })
      .finally(() => {
        setIsDataSent(false);
      });
  };

  // выход
  function handleSignOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("movies");
    localStorage.removeItem("query");
    localStorage.removeItem("checkbox")
    setLoggedIn(false);
    setAllMovies([]);
    setMovies([]);
    setAllSavedMovies([]);
    setSavedMovies([]);
    setCurrentUser({ email: "", name: "" });
    history.push('/');
  }

  // редактирование профиля
  function handleUpdateUser(name, email) {
    mainApi
      .setUserData(name, email)
      .then((res) => {
        setCurrentUser(res);
        setComplitedUpdate(true);
      })
      .catch((err) => {
        console.log(err);
        setIsEditProfileError(err);
      })
      .finally(() => {
        setIsDataSent(false);
      });
  };

  function handleToggleCheckbox() {
    setIsCheckboxOn(!isCheckboxOn);
  };

  function handleSavedToggleCheckbox() {
    setIsSavedCheckboxOn(!isSavedCheckboxOn);
  };

  function handleFilteredMovies(movies, query, isShort) {
    return movies.filter((item) => {
      if (
        query === "" ||
        item.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        (item.nameEN ? item.nameEN : "")
          .toLowerCase()
          .includes(query.toLowerCase())
      ) {
        if (isShort && item.duration > SHORT_MOVIE_DURATION) {
          return false;
        }
        return true;
      }
      return false;
    });
  };

  // поиск по фильмам
  function handleSearchMovies(query) {
    setLoading(true);
    setMoviesNotFound(false);
    setErrorServer(false);
    setMovies([]);
    if (allMovies.length > 0) {
      setMovies(handleFilteredMovies(allMovies, query, isCheckboxOn));
      setLoading(false);
    } else {
      getMovies()
        .then((res) => {
          setAllMovies(res);
          const filtredMovies = handleFilteredMovies(
            res,
            query,
            isCheckboxOn
          );
          if (filtredMovies.length === 0) setMoviesNotFound(true);
          return filtredMovies;
        })
        .then((res) => {
          localStorage.setItem("movies", JSON.stringify(res));
          setMovies(JSON.parse(localStorage.getItem("movies")));
          localStorage.setItem('query', JSON.stringify(query));
          localStorage.setItem('checkbox', JSON.stringify(isCheckboxOn))
          setMovies(res);
        })
        .catch((err) => {
          setMovies([]);
          setErrorServer(true);
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // поиск по сохранённым фильмам
  function handleSaveSearchMovies(query) {
    setLoading(true);
    setIsSavedMoviesNotFound(false);
    const newSavedMovies = handleFilteredMovies(
      allSavedMovies,
      query,
      isSavedCheckboxOn
    );
    setSavedMovies(newSavedMovies);
    if (newSavedMovies.length === 0) setIsSavedMoviesNotFound(true);
    setLoading(false);
  };

  // добавить в сохранённые
  function handleSaveMovie(movieToSave) {
    movieToSave = {
      country: movieToSave.country || "",
      director: movieToSave.director || "",
      duration: movieToSave.duration || 0,
      year: movieToSave.year || "",
      description: movieToSave.description || "",
      image: `https://api.nomoreparties.co${movieToSave.image.url}`,
      trailer: movieToSave.trailerLink || "https://youtube.ru",
      thumbnail: `https://api.nomoreparties.co${movieToSave.image.url}`,
      movieId: movieToSave.id,
      nameRU: movieToSave.nameRU || "",
      nameEN: movieToSave.nameEN || "",
    };
    return mainApi
      .saveMovie(movieToSave)
      .then((savedMovieItem) => {
        const newSavedMovies = [...allSavedMovies, savedMovieItem];
        setAllSavedMovies(newSavedMovies);
        setSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // удалить фильм
  function handleDeleteMovie(movieForDelete, isSavedPage) {
    const movieForDeleteId = isSavedPage
      ? movieForDelete._id
      : savedMovies.find((item) => movieForDelete.id === item.movieId)._id;
    return mainApi
      .deleteMovie(movieForDeleteId)
      .then((res) => {
        const newSavedMovies = allSavedMovies.filter(
          (item) => item._id !== movieForDeleteId
        );
        setAllSavedMovies(newSavedMovies);
        setSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

    return(
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
              <Header loggedIn={loggedIn}/>
                <Switch>

                <ProtectedRoute exact path="/movies"
                loggedIn={token}
                component={Movies}
                movies={movies}
                toggleCheckbox={handleToggleCheckbox}
                checkboxOn={isCheckboxOn}
                handleSearchSubmit={handleSearchMovies}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
                savedMovies={savedMovies}
                isMoviesNotFound={isMoviesNotFound}
                isErrorServer={isErrorServer}
                isLoading={isLoading}
                />

                <ProtectedRoute exact path="/saved-movies"
                loggedIn={token}
                component={SavedMovies}
                movies={savedMovies}
                toggleCheckbox={handleSavedToggleCheckbox}
                checkboxOn={isSavedCheckboxOn}
                handleSearchSubmit={handleSaveSearchMovies}
                handleDeleteMovie={handleDeleteMovie}
                savedMovies={savedMovies}
                isMoviesNotFound={isSavedMoviesNotFound}
                isLoading={isLoading}
                />

                <ProtectedRoute exact path ="/profile"
                loggedIn={token}
                component={Profile}
                handleSignOut={handleSignOut}
                onEditUserInfo={handleUpdateUser}
                isComplitedUpdate={isComplitedUpdate}
                setComplitedUpdate={setComplitedUpdate}
                isError={isEditProfileError}
                setError={setIsEditProfileError}
                />
                
                <Route exact path="/">
                    <Main />
                </Route>

                <Route exact path='/signup'>
                  {!loggedIn ? (
                    <Register
                      onRegister={handleRegister}
                      setError={setIsRegisterError}
                      setIsDataSent={setIsDataSent}
                      isError={isRegisterError}
                      isDataSent={isDataSent}
                    />
                  ) : (
                    <Redirect to="/movies" />
                  )}
                </Route>

                <Route path='/signin'> 
                  {!loggedIn ? (
                    <Login
                      onLogin={handleLogin}
                      setError={setIsLoginError}
                      setIsDataSent={setIsDataSent}
                      isError={isLoginError}
                      isDataSent={isDataSent}
                    />
                  ) : (
                    <Redirect to="/movies" />
                  )}
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
