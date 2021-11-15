import './Profile.css';
import React from 'react';

function Profile() {
    return (
        <section className="profile">
            <div className="profile__box">
                <h2 className="profile__title">Привет, Виталий!</h2>
                <form className="profile__form">
                    <label className="profile__label">Имя
                        <input className="profile__input" type="text" name="name" minLength="2" maxLength="30" id="name" required/>
                    </label>
                    <label className="profile__label">E-mail
                        <input className="profile__input" type="email" name="email" minLength="2" maxLength="30" id="email" required/>
                    </label>
                    <button className="profile__btn profile__btn_type_redact page__link" type="button">Редактировать</button>
                    <button className="profile__btn profile__btn_type_logout page__link" type="button">Выйти из аккаунта</button>
                </form>
            </div>
        </section>
    );
};

export default Profile;