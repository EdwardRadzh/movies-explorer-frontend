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

    getUserData() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._getHeaders(),
        })
        .then(this._checkError)
    }

    setUserData(name, email) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._getHeaders(),
        body: JSON.stringify({
          name,
          email
        })
      })
      .then(this._checkError)
    }

    register(name, email, password) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        .then(this._checkError)
    }

    login(email, password) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(this._checkError)
    }

    checkToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`,
            }
        })
        .then((response) => {
            if(response.ok) {
                return response.json()
            }
            if(response.status === 400) {
                throw new Error("токен не передан или передан не в том формате");
            }
            if(response.status === 401) {
                throw new Error("переданный токен некорректен");
            }
        })
        .then((data) => {
            return data;
        })
    }

      // метод получения избранных пользователем фильмов с сервера
  getUsersMovies() {
    return fetch(`${this._url}/movies`, {
      headers: this._getHeaders()
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      this._checkError();
    })
  };

  // метод добавления нового фильма в избранное (создание карточки)
  saveNewMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    id,
  }) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        country: country || 'no country',
        director,
        duration,
        year,
        description,
        image: `https://api.nomoreparties.co${image.url}`,
        trailer: trailerLink,
        nameRU: nameRU || 'no name',
        nameEN: nameEN || 'no name',
        thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
        movieId: id,
      })
    })
    .then(res => {
      if (res) {
        return res.json();
      }
      this._checkError();
    })
  };

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