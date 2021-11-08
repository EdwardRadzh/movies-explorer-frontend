import './Login.css';
import Logo from "../Logo/Logo";
import { Link } from 'react-router-dom';

function Login() {
    return (
        <section className="auth">
            <Logo />
            <h2 className="auth__title">Рады видеть!</h2>
            <form className="auth__form">
                <label className='auth__label'>E-mail
                    <input
                        id='email'
                        type='email'
                        className='auth__input'
                        name='email'
                        minLength='2'
                        maxLength='30'
                        required
                    />
                </label>
                <label className='auth__label'>Пароль
                    <input
                        id='password'
                        type='password'
                        className='auth__input'
                        name='password'
                        minLength='4'
                        maxLength='20'
                        required
                    />
                </label>
                <button className="auth__btn">Войти</button>
            </form>
            <p className="auth__subtitle">Ещё не зарегистрированы?
                <Link to="/signup" className="auth__link page__link">Регистрация</Link>
            </p>
        </section>
    );
};

export default Login;