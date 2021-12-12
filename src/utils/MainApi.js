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
          name: name,
          email: email,
        })
      })
      .then(this._checkError)
    }

    getSavedMovies() {
      return fetch(`${this._url}/movies`, {
        method: "GET",
        headers: this._getHeaders(),
      })
      .then(this._checkError)
    }

    // register(name, email, password) {
    //     return fetch(`${this._url}/signup`, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify({ name, email, password })
    //     })
    //     .then(this._checkError)
    // }

    // login(email, password) {
    //     return fetch(`${this._url}/signin`, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ email, password })
    //     })
    //     .then(this._checkError)
    //     .then((data) => {
    //       if (data.token) {
    //         localStorage.setItem("jwt", data.token);
    //         return data;
    //       }
    //     })
    // }

    // checkToken(token) {
    //     return fetch(`${this._url}/users/me`, {
    //         method: 'GET',
    //         headers: {
    //           'Authorization' : `Bearer ${token}`,
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //     .then((response) => {
    //         if(response.ok) {
    //             return response.json()
    //         }
    //         if(response.status === 400) {
    //             throw new Error("токен не передан или передан не в том формате");
    //         }
    //         if(response.status === 401) {
    //             throw new Error("переданный токен некорректен");
    //         }
    //     })
    //     .then((data) => {
    //         return data;
    //     })
    // }

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

// export class MainApi {
//   constructor(options) {
//     this._url = options.baseUrl;
//     this._headers = options.headers;
//   }

//   _getHeaders() {
//       const token = localStorage.getItem('jwt');
//       return {
//           ...this._headers,
//           Authorization: `Bearer ${token}`,
//       }
//   }
//   _checkError(res) {
//       if (!res.ok) {
//         return Promise.reject(`Error: ${res.status}`);
//       }
//       return res.json();
//   }

//   getUserInfo() {
//       return fetch(`${this._url}/users/me`, {
//           method: 'GET',
//           headers: this._getHeaders(),
//       })
//       .then(this._checkError)
//   }

//   editUserProfile(name, email) {
//     return fetch(`${this._url}/users/me`, {
//       method: 'PATCH',
//       headers: this._getHeaders(),
//       body: JSON.stringify({
//         name,
//         email
//       })
//     })
//     .then(this._checkError)
//   }

//   // register(name, email, password) {
//   //     return fetch(`${this._url}/signup`, {
//   //         method: 'POST',
//   //         headers: {
//   //             'Accept': 'application/json',
//   //             'Content-type': 'application/json'
//   //         },
//   //         body: JSON.stringify({ name, email, password })
//   //     })
//   //     .then(this._checkError)
//   // }

//   // login(email, password) {
//   //     return fetch(`${this._url}/signin`, {
//   //         method: 'POST',
//   //         headers: {
//   //             'Accept': 'application/json',
//   //             'Content-Type': 'application/json'
//   //         },
//   //         body: JSON.stringify({ email, password })
//   //     })
//   //     .then(this._checkError)
//   // }

//   // checkToken(token) {
//   //     return fetch(`${this._url}/users/me`, {
//   //         method: 'GET',
//   //         headers: {
//   //             "Content-Type": "application/json",
//   //             "Authorization" : `Bearer ${token}`,
//   //         }
//   //     })
//   //     .then((response) => {
//   //         if(response.ok) {
//   //             return response.json()
//   //         }
//   //         if(response.status === 400) {
//   //             throw new Error("токен не передан или передан не в том формате");
//   //         }
//   //         if(response.status === 401) {
//   //             throw new Error("переданный токен некорректен");
//   //         }
//   //     })
//   //     .then((data) => {
//   //         return data;
//   //     })
//   // }

//     // метод получения избранных пользователем фильмов с сервера
//     getSavedMovies() {
//   return fetch(`${this._url}/movies`, {
//     headers: this._getHeaders()
//   })
//   .then(res => {
//     if (res.ok) {
//       return res.json();
//     }
//     this._checkError();
//   })
// };

// // метод добавления нового фильма в избранное (создание карточки)
// saveMovie({
//   country,
//   director,
//   duration,
//   year,
//   description,
//   image,
//   trailerLink,
//   nameRU,
//   nameEN,
//   id,
// }) {
//   return fetch(`${this._url}/movies`, {
//     method: 'POST',
//     headers: this._getHeaders(),
//     body: JSON.stringify({
//       country: country || 'no country',
//       director,
//       duration,
//       year,
//       description,
//       image: `https://api.nomoreparties.co${image.url}`,
//       trailer: trailerLink,
//       nameRU: nameRU || 'no name',
//       nameEN: nameEN || 'no name',
//       thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
//       movieId: id,
//     })
//   })
//   .then(res => {
//     if (res) {
//       return res.json();
//     }
//     this._checkError();
//   })
// };

// //метод удаления карточки пользователя с сервера
// deleteMovie(movieId) {
//   return fetch(`${this._url}/movies/${movieId}?movieId=${movieId}`, {
//     method: 'DELETE',
//     headers: this._getHeaders(),
//   })
//   .then(this._checkError)
// };
// };

// const mainApi = new MainApi({
//   baseUrl: 'https://api.movie-radzhabov.nomoredomains.rocks',
//   headers: {
//       'Content-Type': 'application/json'
//   }
// });

// export default mainApi;