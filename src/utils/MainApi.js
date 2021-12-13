export class MainApi {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _getHeaders() {
      const token = localStorage.getItem('jwt');
      return {
          ...this._headers,
          Authorization: `Bearer ${token}`,
      }
  }
  _checkError(res) {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
  }

  // данные пользователя
  getUserData() {
    return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this._getHeaders(),
    })
    .then(this._checkError)
  }

  // обновить данные пользователя
  setUserData(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        email: email,
      })
    })
    .then(this._checkError)
  }

  // сохранённые фильмы
  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: this._getHeaders(),
    })
    .then(this._checkError)
  }

  // метод добавления нового фильма в избранное (создание карточки)
  saveMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    })
    .then(this._checkError)
  }

  //метод удаления карточки пользователя с сервера
  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
    .then(this._checkError)
  };
};

const mainApi = new MainApi({
    baseUrl: 'https://api.movie-radzhabov.nomoredomains.rocks',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default mainApi;
