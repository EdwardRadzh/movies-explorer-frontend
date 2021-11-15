import './Header.css';
import { Route } from 'react-router-dom';
import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";

function Header({ loggedIn }) {
    const endpoints = ['/movies', '/saved-movies', '/profile', '/'];
    return (
        <Route exact path={endpoints}>
          <header className='header'>
            <Logo />
            <Navigation loggedIn={loggedIn}/>
          </header>
        </Route>
    );
};

export default Header;