import '../Login/Login.css';
import React from 'react';
import Logo from "../Logo/Logo";
import { Link } from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('');
    const { onRegister, onLoginState } = props;

    const handleChangeName = (evt) => {
        setName(evt.target.value);
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister({ name, email, password });
    }

    // React.useEffect(() => {
    //     onLoginState(true)
    // }, [onLoginState])

    return (
        <section className="auth">
            <Logo />
            <h2 className="auth__title">Добро пожаловать!</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <label className='auth__label'>Имя
                    <input
                        onChange={handleChangeName}
                        value={name}
                        id='name'
                        type='text'
                        className='auth__input'
                        name='name'
                        minLength='2'
                        maxLength='30'
                        required
                    />
                </label>
                <label className='auth__label'>E-mail
                    <input
                        onChange={handleChangeEmail}
                        value={email}
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
                        onChange={handleChangePassword}
                        value={password}
                        id='password'
                        type='password'
                        className='auth__input'
                        name='password'
                        minLength='4'
                        maxLength='20'
                        required
                    />
                    <span className='auth__error'>Что-то пошло не так...</span>
                </label>
                <button className="auth__btn">Зарегистрироваться</button>
            </form>
            <p className="auth__subtitle">Уже зарегистрированы?
                <Link to="/signin" className="auth__link page__link">Войти</Link>
            </p>
        </section>
    );
};

export default Register;