import './App.css';
import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';

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

function App() {

    const history = useHistory();

    const [currentUser, setCurrentUser] = React.useState({});
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [loginState, setLoginState] = React.useState(false);
    const [savedMovies, setSavedMovies] = React.useState([]);
    const [userData, setUserData] = React.useState('');

    function handleLoggedIn() {
        setIsLoggedIn(true)
    };

    function handleLoginState(state) {
        setLoginState(state);
    };

    React.useEffect(() => {
        if (localStorage.getItem('jwt')) {
          const jwt = localStorage.getItem('jwt');
    
          mainApi.checkToken(jwt)
            .then((res) => {
              if(res) {
                setIsLoggedIn(true);
                setUserData(res.email, res.name);
              }
            })
            .catch((err) => {
              console.log(`Произошла ошибка: ${err}`);
            });
        }
      }, [history, isLoggedIn]);

    React.useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) {
            return
        }
        mainApi.getUserData(token)
        .then((data) => {
            handleLoggedIn();
              handleLoggedIn();
              setCurrentUser(data)
              history.push('/movies');
        })
        .catch((err) => {
            console.log(err);
        })
    }, [history, isLoggedIn]);

    React.useEffect(() => {
        if(isLoggedIn) {
            mainApi.getUsersMovies()
            .then((data) => {
                setSavedMovies(data)
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }, [isLoggedIn])

    function signUp({name, email, password}) {
        return mainApi.register(name, email, password)
            .then((res) => {
                if(res) {
                    // signIn(res.email, password)
                    setUserData(res.email, res.name)
                    history.push('/sign-in')
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function signIn({email, password}) {
        return mainApi.login(email, password)
            .then((res) => {
                if (res.token) {
                    console.log(email);
                    handleLoggedIn();
                    setUserData(res.email);
                    localStorage.setItem('jwt', res.token);
                    history.push('/movies');
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function signOut() {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        setCurrentUser({})
        history.push("/signin");
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
        const newMoviesList = savedMovies.filter((m) => m._id === movie._id ? false : true);
        setSavedMovies(newMoviesList);
      })
      .catch(err => console.log(err))
  };
    
    return(
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Switch>
                    <Route path='/signup'>
                        {isLoggedIn ? <Redirect to='/movies' /> : <Register onRegister={signUp} onLoginState={handleLoginState}  />}
                     </Route>
                    <Route path='/signin'>
                        {isLoggedIn ? <Redirect to='/movies' /> : <Login onLogin={signIn} onLoginState={handleLoginState} />}
                    </Route>

                    <Route path='/' exact>
                        <Header />
                        <Main />
                    </Route>

                    <Route 
                    path='/movies'

                    ><Header/> <Movies
                    isLoggedIn={isLoggedIn}
                    savedMoviesList={savedMovies}
                    onLikeClick={handleSaveMovie}
                    onDeleteClick={handleDeleteMovie}/>
                    </Route>

                    <Route 
                    path='/saved-movies'
                    
>
                        <SavedMovies
                            isLoggedIn={isLoggedIn}
                            list={savedMovies}
                            onDeleteClick={handleDeleteMovie}/>
                            <Header/>   
                    </Route>

                    <Route
                    path="/profile"
                    
                    >
                        <Profile
                        onSignOut={signOut}/>
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