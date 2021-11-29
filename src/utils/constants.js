// const BASE_URL = 'https://api.movie-radzhabov.nomoredomains.rocks';
// const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

// const SUCCESSFUL_CODE = 200;
// const INVALID_CODE = 400;

// export {
//   BASE_URL,
//   MOVIES_URL,
//   SUCCESSFUL_CODE,
//   INVALID_CODE
// };

const BASE_URL = 'https://api.movie-radzhabov.nomoredomains.rocks';
const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const SUCCESSFUL_CODE = 200;
const INVALID_CODE = 400;

export const statusSuccessMessage = 'Вы успешно зарегистрировались!';
export const statusLoadMessage = 'Идет загрузка...';
export const statusEditMessage = 'Информация успешно изменена!';
export const statusErrorText = 'Что-то пошло не так! Попробуйте еще раз.';

export const statusErrors = [
  {
    name: 'login-form',
    errors: [
      {
        status: 400,
        message: 'Не передано одно из полей.'
      },
      {
        status: 401,
        message: 'Пользователь не найден. Проверьте Email и Пароль.'
      },
      {
        status: 409,
        message: 'Пользователь с таким email уже существует'
      }
    ]
  },
  {
    name: 'register-form',
    errors: [
      {
        status: 400,
        message: 'Некорректно заполнено одно из полей. Попробуйте еще раз.'
      }
    ]
  }
];

export {
  BASE_URL,
  MOVIES_URL,
  SUCCESSFUL_CODE,
  INVALID_CODE
};