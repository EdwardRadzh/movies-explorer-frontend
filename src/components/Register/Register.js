import React from 'react';
import useValidForm from '../../hooks/UseFormValidation';
import { useHistory } from "react-router-dom";
import Form from '../Form/Form';

function Register({ 
    onRegister,
    setError,
    setIsDataSent,
    isError,
    isDataSent, }) {

    const { values, handleChange, errors, isValid } = useValidForm();
    const history = useHistory();

    React.useEffect(() => {
        setError(false);
      }, [history, setError]);

    function handleSubmit(e) {
        e.preventDefault();
        setIsDataSent(true);
        onRegister(values.name, values.email, values.password);
    }

    return (
        <>
            <Form
            title={"Добро пожаловать!"}
            handleSubmit={handleSubmit}
            isRegisterPage={true}
            values={values}
            handleChange={handleChange}
            errors={errors}
            isError={isError}
            isValid={isValid}
            isDataSent={isDataSent}
            submitErrorText={"При регистрации произошла ошибка"}
            btnText={"Зарегистрироваться"}
            btnCaptionText={"Уже зарегистрированы?"}
            btnLinkPath={"/signin"}
            btnCaptionLinkText={"Войти"}
            addRequired={true}
            />
      </>
    );
};

export default Register;