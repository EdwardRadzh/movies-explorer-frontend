// export class Auth {
//     constructor(options) {
//       this._url = options.baseUrl;
//       this._headers = options.headers;
//     }

//     _getHeaders() {
//         const token = localStorage.getItem('jwt');
//         return {
//             ...this._headers,
//             Authorization: `Bearer ${token}`,
//         }
//     }
//     _checkError(res) {
//         if (!res.ok) {
//           return Promise.reject(`Error: ${res.status}`);
//         }
//         return res.json();
//     }

//     register(name, email, password) {
//         return fetch(`${this._url}/signup`, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify({ name, email, password })
//         })
//         .then(this._checkError)
//     }

//     login(email, password) {
//         return fetch(`${this._url}/signin`, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ email, password })
//         })
//         .then(this._checkError)
//     }

//     getContent(token) {
//         return fetch(`${this._url}/users/me`, {
//             method: 'GET',
//             headers: {
//                 'Conten-Type':'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//           .then(this._checkError)
//           .then((data) => {
//               return data
//           })
//     }
// }

// const auth = new Auth({
//     baseUrl: 'https://api.movie-radzhabov.nomoredomains.rocks',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// export default auth;

export class Auth {
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
        .then((data) => {
            if (data.token) {
                localStorage.setItem("jwt", data.token);
                return data
            }
        })
    }

    authorize(email, password) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(this._checkError)
        .then(data => {
            if (data.token) {
                localStorage.setItem("jwt", data.token);
                return data;
            }
        })
    }

    getContent(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Conten-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
          .then(this._checkError)
          .then((data) => {
              return data
          })
    }
}

const auth = new Auth({
    baseUrl: 'https://api.movie-radzhabov.nomoredomains.rocks',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default auth;