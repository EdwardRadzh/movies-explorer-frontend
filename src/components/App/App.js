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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRout/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import { SUCCESSFUL_CODE } from '../../utils/constants';

function App() {

    const history = useHistory();

    const [currentUser, setCurrentUser] = React.useState({});
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [savedMovies, setSavedMovies] = React.useState([]);
    const [userData, setUserData] = React.useState('');
    const [isError, setIsError] = React.useState(false);

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

    React.useEffect(() => {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
    
          mainApi.checkToken(jwt)
            .then((res) => {
              if(res) {
                handleLoggedIn();
                setCurrentUser(res)
                // setUserData(res.email, res.name);
                // history.push('/movies')
              }
            })
            .catch((err) => {
              console.log(`Произошла ошибка: ${err}`);
            }); 
        }
      }, [history, loggedIn]);

      React.useEffect(() => {
        if (loggedIn) {
          history.push('/movies');
        }
      }, [history, loggedIn]);

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

    React.useEffect(() => {
        if(loggedIn) {
            mainApi.getUsersMovies()
            .then((data) => {
                setSavedMovies(data)
                setIsError(false)
            })
            .catch((err) => {
                setIsError(true)
                console.log(err);
            })
        }
    }, [loggedIn])

    function signUp(name, email, password) {
        return mainApi.register(name, email, password)
            .then((res) => {
                if(res) {
                    signIn(res.email, password)
                    setUserData(res.name, res.email)
                    history.push('/movies')
                }
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

    function signIn(email, password) {
        return mainApi.login(email, password)
            .then((res) => {
                if (res.token) {
                    handleLoggedIn();
                    localStorage.setItem('jwt', res.token);
                    history.push('/movies');
                }
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

    function signOut() {
        localStorage.clear();
        setLoggedIn(false);
        setCurrentUser({})
        setSavedMovies([])
        history.push("/");
    }

    // обработчик добавления фильма в избранное
  function handleSaveMovie(movie){
    mainApi.saveNewMovie(movie)
      .then(newCard => {
        setSavedMovies([newCard, ...savedMovies]);
      })
      .catch(err => console.log(err))
  };

  // обработчик удаления фильма из избранного
  function handleDeleteMovie(movie){
    mainApi.deleteMovie(movie._id)
      .then(() => {
        const newMoviesList = savedMovies.filter((m) => m._id !== movie._id);
        setSavedMovies(newMoviesList);
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
    
    return(
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page" onClick={infoMessage.isShown ? handleClickResetInfoMessage : null}>
                
                <Header loggedIn={loggedIn}/>

                    <Switch>

                    <ProtectedRoute exact path="/movies"
                    component={Movies}
                    loggedIn={loggedIn}
                    savedMoviesList={savedMovies}
                    onLikeClick={handleSaveMovie}
                    onDeleteClick={handleDeleteMovie}
                    />

                    <ProtectedRoute exact path="/saved-movies"
                    component={SavedMovies}
                    loggedIn={loggedIn}
                    list={savedMovies}
                    onDeleteClick={handleDeleteMovie}
                    isError={isError}
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
                        <Register onRegister={signUp} infoMessage={infoMessage} />
                     </Route>

                    <Route path='/signin'>
                        <Login onLogin={signIn} infoMessage={infoMessage} />
                    </Route>

                    <Route path="*">
                        <PageNotFound />
                    </Route>

                    <Route>
                        {loggedIn ? (
                            <Redirect  to="/movies"/>
                        ) : (
                            <Redirect to="/"/>
                        )}
                    </Route>

                    </Switch>

                <Footer />

            </div>
        </CurrentUserContext.Provider>
    );
};

export default App;