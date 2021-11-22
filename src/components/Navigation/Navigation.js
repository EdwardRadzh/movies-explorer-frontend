import './Navigation.css';
import React from 'react';
import { Link, Switch, Route, NavLink, useLocation } from 'react-router-dom';
import account from '../../images/account_pic.svg';
import BurgerNav from '../BurgerNav/BurgerNav';

function Navigation({ isLoggedIn }) {

    const location = useLocation();
    const [isMenuActive, setIsMenuActive] = React.useState(false);

    return (
        <nav className={`menu ${location.pathname === "/" ? "" : 'menu__account menu__main-burger'}`}>
            {location.pathname === "/" ? 
            (
                <>
                    <Link to='/signup' className='menu__link page__link'>Регистрация</Link>
                    <Link to='/signin' className='menu__link menu__link_type_signin page__link'>Войти</Link>
                </>
            ) : (
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
            )}
        </nav>
        
            // <Route exact path="/">
            //     <nav className="menu">
            //         <Link to='/signup' className='menu__link page__link'>Регистрация</Link>
            //         <Link to='/signin' className='menu__link menu__link_type_signin page__link'>Войти</Link> 
            //     </nav>
            // </Route>
            //  <Route path="/">
            //     <nav className="menu__main">
            //         <Link to='/movies'  className='memu__link menu__film-link page__link'
            //         >
            //         Фильмы
            //         </Link>
            //         <Link to='/saved-movies' className='menu__link menu__film-link page__link'
            //         >
            //         Сохраненные фильмы
            //         </Link>
            //         <div className="menu__account">
            //             <NavLink to='/profile' className='menu__link menu__link_type_profile page__link menu__pic'
            //             >
            //             Аккаунт
            //             </NavLink>
            //             {/* <button className='menu__pic' src={account} alt='иконка аккаунта' /> */}
            //         </div>
            //     </nav>
            //     <nav className="menu__main-burger">
            //         <button className="menu__burger-button" 
            //                 onClick={() => setIsMenuActive(!isMenuActive)}
            //         />
            //         <BurgerNav
            //             active={isMenuActive}
            //             setActive={setIsMenuActive} />
            //     </nav>
            // </Route>
        

        
            // <nav>
            //     {isLoggedIn ? (
            //         <>
            //             <div className=" menu__main">
            //     <NavLink to='/movies'  className='memu__link menu__film-link page__link'
            //     >
            //     Фильмы
            //     </NavLink>
            //     <NavLink to='/saved-movies' className='menu__link menu__film-link page__link'
            //     >
            //     Сохраненные фильмы
            //     </NavLink>
            //     <div className="menu__account">
            //         <NavLink to='/profile' className='menu__link menu__link_type_profile page__link'
            //         >
            //         Аккаунт
            //         </NavLink>
            //         <button className='menu__pic' src={account} alt='иконка аккаунта' />
            //     </div>
            
            //     <div className="menu__main-burger">
            //         <button className="menu__burger-button" 
            //                 onClick={() => setIsMenuActive(!isMenuActive)}
            //         />
            //         <BurgerNav
            //             active={isMenuActive}
            //             setActive={setIsMenuActive} />
            //     </div>
            // </div>
            //         </>
            //     )
            // : (
            //     <>
            //         <div className="menu">
            //     <Link to='/signup' className='menu__link page__link'>Регистрация</Link>
            //     <Link to='/signin' className='menu__link menu__link_type_signin page__link'>Войти</Link> 
            // </div>
            //     </>
            // )}
            
        
        
            
            // </nav>
        

        
    );
};

export default Navigation;