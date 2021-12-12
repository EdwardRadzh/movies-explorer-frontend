import React from 'react';
import useValidForm  from '../../hooks/UseFormValidation';
import { useHistory } from "react-router-dom";
import Form from '../Form/Form';

function Login({ onLogin, setError, setIsDataSent, isError, isDataSent }) {
    const history = useHistory();
    const { values, handleChange, errors, isValid } = useValidForm();
    
    React.useEffect(() => {
        setError(false);
      }, [history, setError]);

    function handleSubmit(e) {
        e.preventDefault();
        setIsDataSent(true);
        onLogin(values.email, values.password);
    }

    return (
        <>
            <Form
            title={"Рады видеть!"}
            handleSubmit={handleSubmit}
            isRegisterPage={false}
            values={values}
            handleChange={handleChange}
            errors={errors}
            isError={isError}
            isValid={isValid}
            isDataSent={isDataSent}
            submitErrorText={"При авторизации произошла ошибка"}
            btnText={"Войти"}
            btnCaptionText={"Ещё не зарегистрированы?"}
            btnLinkPath={"/signup"}
            btnCaptionLinkText={"Регистрация"}
            addRequired={false}
            />   
        </>
    );
};

export default Login;