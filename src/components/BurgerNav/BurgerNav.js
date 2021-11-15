import React from 'react';
import {Link} from "react-router-dom";
import account from '../../images/account_pic.svg';
import './BurgerNav.css';


const BurgerNav = ({active, setActive}) => {
    return (
        <>
            <div className={active ? 'burger-menu__blur' : 'burger-menu__blur burger-menu__blur_disable'}
                 onClick={() => setActive(!active)}
            />
            <div className={active ? 'burger-menu' : ' burger-menu burger-menu_disable'}>
                <div className='burger-menu__content' onClick={evt => evt.stopPropagation()}>
                    <button className='burger-menu__button' onClick={() => setActive(false)}/>

                    <ul className='burger-menu__list'>
                        <li className='burger-menu__list_item'>
                            <Link onClick={() => setActive(false)}
                                  className='burger-menu__link'
                                  to='/'>Главная</Link>
                        </li>
                        <li className='burger-menu__list_item'>
                            <Link onClick={() => setActive(false)}
                                  className='burger-menu__link'
                                  to='/movies'>Фильмы</Link>
                        </li>
                        <li className='burger-menu__list_item'>
                            <Link onClick={() => setActive(false)}
                                  className='burger-menu__link'
                                  to='/saved-movies'>Сохраненные фильмы</Link>
                        </li>
                    </ul>

                    <div className="menu__account_type_burger">
                        <Link to='/profile' className='menu__link menu__link_type_profile page__link'
                        >
                        Аккаунт
                        </Link>
                        <img className='menu__pic' src={account} alt='иконка аккаунта' />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BurgerNav;