import './Profile.css';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useValidForm from '../../hooks/UseFormValidation';

function Profile({ 
    handleSignOut,
    onEditUserInfo,
    isComplitedUpdate,
    setComplitedUpdate,
    isError,
    setError 
    }) {

    const currentUser = React.useContext(CurrentUserContext);
    const userName = currentUser.name;
    const userEmail = currentUser.email;
    
    const [isChanges, setIsChanges] = React.useState(false);

    const {
    values, 
    handleChange, 
    setValues, 
    resetForm
    } = useValidForm();

    React.useEffect(() => {
      resetForm();
      setValues({
        name: userName,
        email: userEmail,
      });
    }, [resetForm, currentUser, setValues, userName, userEmail]);

    React.useEffect(() => {
      setIsChanges(
        !(values.name === userName) || !(values.email === userEmail)
      );
    }, [values.name, values.email, userName, userEmail]);

    function handleEditUserProfile(evt) {
        evt.preventDefault();
        setComplitedUpdate("");
        setError("");
        onEditUserInfo(values.name, values.email);
    };

    return (
        <section className="profile">
            <div className="profile__box">
                <h2 className="profile__title">{`Привет, ${userName}!`}</h2>
                <form className="profile__form" onSubmit={handleEditUserProfile}>
                    <label className="profile__label">Имя
                        <input 
                        className="profile__input" 
                        type="text" 
                        name="name" 
                        minLength="2" 
                        maxLength="30" 
                        id="name" 
                        required
                        value={values.name || ''}
                        onChange={handleChange}
                        />
                    </label>
                    <label className="profile__label">E-mail
                        <input 
                        className="profile__input" 
                        type="email" 
                        name="email" 
                        minLength="2" 
                        maxLength="30" 
                        id="email" 
                        required
                        value={values.email || ''}
                        onChange={handleChange}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        />
                    </label>
                    {isComplitedUpdate ? (
                        <span className="profile__submit-sucsess">
                            Успешно!
                        </span>
                    ) : null}
                    {isError ? (
                        <span className="profile__submit-error">
                            При обновлении профиля произошла ошибка
                        </span>
                    ) : null}                      
                    <button 
                    className="profile__btn profile__btn_type_redact page__link" type="submit"
                    disabled={!isChanges}>Редактировать</button>
                    <button className="profile__btn profile__btn_type_logout page__link" 
                    type="button" 
                    onClick={handleSignOut}>Выйти из аккаунта
                    </button>
                </form>
            </div>
        </section>
        
    );
};

export default Profile;