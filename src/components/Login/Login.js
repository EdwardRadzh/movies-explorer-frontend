import './Login.css';
import React from 'react';
import Logo from "../Logo/Logo";
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/UseFormValidation';
import InfoMessage from '../InfoMessage/InfoMessage';

function Login({ onLogin, infoMessage }) {

    const {values, errors, isValid, handleChange} = useFormWithValidation();

    function handleSubmit(e) {
        e.preventDefault();
        if (!values.email || !values.password) {
            return
        }
        onLogin(values.email, values.password)
    }

    return (
        <section className="auth">
            <Logo />
            <h2 className="auth__title">Рады видеть!</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
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
                        pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                        required
                    />
                </label>
                <span id='email-error' className='auth__error'>
                        {errors.email || ''}
                </span>
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
                    <span id='email-error' className='auth__error'>
                        {errors.password || ''}
                    </span>
                </label>

                <InfoMessage {...infoMessage} />

                <button className="auth__btn" disabled={!isValid}>Войти</button>
            </form>
            <p className="auth__subtitle">Ещё не зарегистрированы?
                <Link to="/signup" className="auth__link page__link">Регистрация</Link>
            </p>
        </section>
    );
};

export default Login;

// import './Login.css';
// import React from 'react';
// import Logo from "../Logo/Logo";
// import { Link } from 'react-router-dom';
// import { useValidationForm } from '../../hooks/UseFormValidation';
// import InfoMessage from '../InfoMessage/InfoMessage';

// function Login({ handleLogin, handleError }) {
//     const [email, setEmail] = React.useState('');
//     const [password, setPassword] = React.useState('');
//     // const { onLogin, onLoginState } = props;

//     const {values, handleErrors, errors, isValid} = useValidationForm();

//     function handleSubmit(e) {
//         e.preventDefault();
//         handleLogin(e, values.email, values.password);
//       }

//     // function handleSubmit(e) {
//     //     e.preventDefault();
//     //     if (!values.email || !values.password) {
//     //         return
//     //     }
//     //     onLogin(values.email, values.password)
//     // }

//     // React.useEffect(() => {
//     //     onLoginState(false);
//     // }, [onLoginState])

//     return (
//         <section className="auth">
//             <Logo />
//             <h2 className="auth__title">Рады видеть!</h2>
//             <form className="auth__form" onSubmit={handleSubmit}>
//                 <label className='auth__label'>E-mail
//                     <input
//                         onChange={handleErrors}
//                         value={values.email || ''}
//                         id='email'
//                         type='email'
//                         className='auth__input'
//                         name='email'
//                         minLength='2'
//                         maxLength='30'
//                         required
//                         pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
//                     />
//                 </label>
//                 <span id='email-error' className='auth__error'>
//                         {errors.email || ''}
//                 </span>
//                 <label className='auth__label'>Пароль
//                     <input
//                         onChange={handleErrors}
//                         value={values.password || ''}
//                         id='password'
//                         type='password'
//                         className='auth__input'
//                         name='password'
//                         minLength='4'
//                         maxLength='20'
//                         required
//                     />
//                     <span id='email-error' className='auth__error'>
//                         {errors.password || ''}
//                     </span>
//                 </label>

//                 {/* <InfoMessage {...infoMessage} /> */}

//                 <button className="auth__btn" disabled={!isValid}>Войти</button>
//             </form>
//             <p className="auth__subtitle">Ещё не зарегистрированы?
//                 <Link to="/signup" className="auth__link page__link">Регистрация</Link>
//             </p>
//         </section>
//     );
// };

// export default Login;