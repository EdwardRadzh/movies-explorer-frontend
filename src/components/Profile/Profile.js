// import './Profile.css';
// import React from 'react';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import Header from '../Header/Header';
// import { useFormWithValidation } from '../../hooks/UseFormValidation';
// import InfoMessage from '../InfoMessage/InfoMessage';

// function Profile({ onSignOut, onUpdate, infoMessage }) {

//     const currentUser = React.useContext(CurrentUserContext);
//     const {values, errors, isValid, handleChange, setValues, setIsValid} = useFormWithValidation();
//     const [isInputActive, setIsInputActive] = React.useState(false);

//     // получаем текущие значения для установки в поля формы
//     React.useEffect(() => {
//         if (currentUser) {
//         setValues({
//             name: currentUser.name,
//             email: currentUser.email,
//         });
//         }
//     }, [setValues, currentUser]);

//       // блокируем отправку формы если значения в полях и контексте одинаковые
//   React.useEffect(() => {
//     if (currentUser.name === values.name && currentUser.email === values.email) {
//       setIsValid(false);
//     }
//   }, [setIsValid, values, currentUser]);

//     // блокируем поля если редактирование прошло успешно
//     React.useEffect(() => {
//         if (infoMessage.isShown && infoMessage.code === 200) {
//           setIsInputActive(false);
//         }
//       }, [setIsInputActive, infoMessage.isShown, infoMessage.code]);

//       // обработчик отправки формы
//   function handleSubmit(e) {
//     e.preventDefault();
//     onUpdate(values.name, values.email);
//   };

//     // обработчик для разблокирования полей ввода
//     function handleRedactClick() {
//         setIsInputActive(true);
//       };
//     return (
        
//         <section className="profile">
//             <div className="profile__box">
//                 <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
//                 <form className="profile__form" onSubmit={handleSubmit}>
//                     <label className="profile__label">Имя
//                         <input 
//                         className="profile__input" 
//                         type="text" 
//                         name="name" 
//                         minLength="2" 
//                         maxLength="30" 
//                         id="name" 
//                         required
//                         value={values.name || ''}
//                         onChange={handleChange}
//                         pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
//                         disabled={!isInputActive}/>
//                         <span id="name-error" className='profile__error'>
//                              {errors.name ? 'Поле должно быть заполнено и может содержать только латиницу, кириллицу, пробел или дефис' : ''}
//                         </span>
//                     </label>
//                     <label className="profile__label">E-mail
//                         <input 
//                         className="profile__input" 
//                         type="email" 
//                         name="email" 
//                         minLength="2" 
//                         maxLength="30" 
//                         id="email" 
//                         required
//                         value={values.email || ''}
//                         disabled={!isInputActive}
//                         onChange={handleChange}/>
//                         <span id='email-error' className='profile__error'>
//                              {errors.email || ''}
//                         </span>
//                     </label>

//                     <InfoMessage {...infoMessage} />

//                     {isInputActive ? (
//                         <button
//                         className={`profile__btn profile__btn_type_submit app__link`}
//                         type='submit'
//                         disabled={!isValid }
//                         >
//                         Сохранить
//                         </button>
//                     ) : (
//                         <>
//                         <button 
//                         className="profile__btn profile__btn_type_redact page__link" type="button"
//                         onClick={handleRedactClick}>Редактировать</button>
//                         <button className="profile__btn profile__btn_type_logout page__link" type="button" onClick={onSignOut}>Выйти из аккаунта</button>
//                         </>
//                     )}
//                 </form>
//             </div>
//         </section>
        
//     );
// };

// export default Profile;

import './Profile.css';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import Header from '../Header/Header';
import { useValidationForm  } from '../../hooks/UseFormValidation';
// import InfoMessage from '../InfoMessage/InfoMessage';
import { AppContext } from '../../contexts/AppContext';

function Profile({ onUpdateUser }) {

    const currentUser = React.useContext(CurrentUserContext);
    const { values, handleErrors, errors, isValid, setIsValid } = useValidationForm();
    const [isEdit, setIsEdit] = React.useState(false);
    const value = React.useContext(AppContext);
    const inputRef = React.useRef();

    function handleOnEdit() {
      setIsEdit(!isEdit);
    }

    function handleSubmit(e) {
      e.preventDefault();
      onUpdateUser(
        e,
        values.name || currentUser.name,
        values.email || currentUser.email
      );
      setIsEdit(false);
      setIsValid(false);
    }

  //   // получаем текущие значения для установки в поля формы
  //   React.useEffect(() => {
  //       if (currentUser) {
  //       setValues({
  //           name: currentUser.name,
  //           email: currentUser.email,
  //       });
  //       }
  //   }, [setValues, currentUser]);

  //     // блокируем отправку формы если значения в полях и контексте одинаковые
  // React.useEffect(() => {
  //   if (currentUser.name === values.name && currentUser.email === values.email) {
  //     setIsValid(false);
  //   }
  // }, [setIsValid, values, currentUser]);

  //   // блокируем поля если редактирование прошло успешно
  //   React.useEffect(() => {
  //       if (infoMessage.isShown && infoMessage.code === 200) {
  //         setIsInputActive(false);
  //       }
  //     }, [setIsInputActive, infoMessage.isShown, infoMessage.code]);

  //     // обработчик отправки формы
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   onUpdate(values.name, values.email);
  // };

  //   // обработчик для разблокирования полей ввода
  //   function handleRedactClick() {
  //       setIsInputActive(true);
  //     };
    return (
        
        <section className="profile">
            <div className="profile__box">
                <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
                <form className="profile__form" onSubmit={handleSubmit}>
                    <label className="profile__label">Имя
                        <input 
                        className="profile__input" 
                        type="text" 
                        name="name" 
                        minLength="2" 
                        maxLength="30" 
                        id="name" 
                        required
                        ref={inputRef}
                        // value={values.name || ''}
                        onChange={handleErrors}
                        pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
                        defaultValue={currentUser.name}
                        disabled={!isEdit}/>
                        <span id="name-error" className='profile__error'>
                             {errors.name ? 'Поле должно быть заполнено и может содержать только латиницу, кириллицу, пробел или дефис' : ''}
                        </span>
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
                        ref={inputRef}
                        // value={values.email || ''}
                        disabled={!isEdit}
                        defaultValue={currentUser.email}
                        onChange={handleErrors}/>
                        <span id='email-error' className='profile__error'>
                             {errors.email || ''}
                        </span>
                    </label>

                    {/* <InfoMessage {...infoMessage} /> */}

                    {isEdit ? (
                        <button
                        className={`profile__btn profile__btn_type_submit app__link ${
                          !isValid ||
                          (values.name === (currentUser.name || undefined) &&
                          values.email === (currentUser.email || undefined))
                          ? 'profile__btn_type_submit_disabled'
                          : ''
                        }`}
                        type='submit'
                        onClick={handleSubmit}
                        disabled={!isValid || 
                          (values.name === (currentUser.name || undefined) && values.email === (currentUser.email || undefined)) 
                        }
                        >
                        Сохранить
                        </button>
                    ) : (
                        <>
                        <button 
                        className="profile__btn profile__btn_type_redact page__link" type="button"
                        onClick={handleOnEdit}>Редактировать</button>
                        <button className="profile__btn profile__btn_type_logout page__link" type="button" onClick={value.signOut}>Выйти из аккаунта</button>
                        </>
                    )}
                </form>
            </div>
        </section>
        
    );
};

export default Profile;