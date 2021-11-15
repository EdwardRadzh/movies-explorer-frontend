import './App.css';
import React, {useRef} from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import { pageContext } from '../../contexts/pageContext';

function App() {
    const aboutRef = useRef();
    
    return(
        <pageContext.Provider value={{ aboutRef }}>
            <div className="page">
                <Switch>
                    <Route path="/signup">
                        <Register />
                    </Route>

                    <Route path="/signin">
                        <Login />
                    </Route>

                    <Route path='/' exact>
                        <Header />
                        <Main />
                    </Route>

                    <Route path="/movies">
                        <Header />
                        <Movies />
                    </Route>

                    <Route path="/saved-movies">
                        <Header />
                        <SavedMovies />
                    </Route>

                    <Route path="/profile">
                        <Header />
                        <Profile />
                    </Route>

                    <Route path="*">
                        <PageNotFound />
                    </Route>
                </Switch>
                <Footer />
            </div>
        </pageContext.Provider>
        
    );
};

export default App;