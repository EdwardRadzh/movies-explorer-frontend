import './Navigation.css';
import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import BurgerNav from '../BurgerNav/BurgerNav';

function Navigation({ loggedIn }) {

    const location = useLocation();
    const [isMenuActive, setIsMenuActive] = React.useState(false);

    return (
        <nav className={`menu ${location.pathname === '/' ? "" : 'menu__account menu__main-burger'}`}>
            {loggedIn  ? 
            (
                <>
                <div className="menu__main">
                <Link to='/movies'  className='memu__link menu__film-link page__link'
                >
                Фильмы
                </Link>
                <Link to='/saved-movies' className='menu__link menu__film-link page__link'
                >
                Сохраненные фильмы
                </Link>
                <div className="menu__account">
                    <Link to='/profile' className='menu__link menu__link_type_profile page__link '
                    >
                    Аккаунт
                    </Link>
                    <Link to='/profile' className='menu__pic page__link' alt='иконка аккаунта'></Link>
                </div>
            </div>
            <div className="menu__main-burger">
                <button className="menu__burger-button" 
                        onClick={() => setIsMenuActive(!isMenuActive)}
                />
                <BurgerNav
                    active={isMenuActive}
                    setActive={setIsMenuActive} />
            </div>
            </>

            ) : (
            <>
                <Link to='/signup' className='menu__link page__link'>Регистрация</Link>
                <Link to='/signin' className='menu__link menu__link_type_signin page__link'>Войти</Link>
            </>
            )}
        </nav>
    );
};

export default Navigation;

