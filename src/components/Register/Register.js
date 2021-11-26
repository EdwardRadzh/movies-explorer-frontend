import '../Login/Login.css';
import React from 'react';
import Logo from "../Logo/Logo";
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/UseFormValidation';
import InfoMessage  from '../InfoMessage/InfoMessage';

function Register(props) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('');
    const { onRegister, infoMessage } = props;

    const {values, errors, isValid, handleChange} = useFormWithValidation();

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(values.name, values.email, values.password);
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
                        value={values.name || ''}
                        id='name'
                        type='text'
                        className='auth__input'
                        name='name'
                        minLength='2'
                        maxLength='30'
                        required
                        pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
                        onChange={handleChange}
                    />
                    <span id='name-error' className='auth__error'>
                        {errors.name ? `Поле должно быть заполнено и может содержать только латиницу,
                        кириллицу, пробел или дефис` : ''}
                    </span>
                </label>
                <label className='auth__label'>E-mail
                    <input
                        onChange={handleChange}
                        value={values.email || ''}
                        id='email'
                        type='email'
                        className='auth__input'
                        name='email'
                        minLength='2'
                        maxLength='30'
                        required
                    />
                    <span id='email-error' className='auth__error'>
                        {errors.email || ''}
                    </span>
                </label>
                <label className='auth__label'>Пароль
                    <input
                        onChange={handleChange}
                        value={values.password || ''}
                        id='password'
                        type='password'
                        className='auth__input'
                        name='password'
                        minLength='4'
                        maxLength='20'
                        required
                    />
                    <span id='password-error' className='auth__error'>
                        {errors.password || ''}
                    </span>
                    
                </label>

                <InfoMessage {...infoMessage} />

                <button className="auth__btn" type="submit" disabled={!isValid}>Зарегистрироваться</button>
            </form>
            <p className="auth__subtitle">Уже зарегистрированы?
                <Link to="/signin" className="auth__link page__link">Войти</Link>
            </p>
        </section>
    );
};

export default Register;