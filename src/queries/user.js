// user.js
// -----------------
// This file contains the user login query. A username & password is sent as the request payload, and upon success
// a JWT is returned which gives the user Admin privileges when making subsequent API requests.

let url = "http://3.14.10.121:8080/"

// UserLogin takes the user credentials, and queries the database for matching a record.
export function UserLogin(username, password) {

    const payload = {
        username: username,
        password: password,
    }

    const request = new Request(url + 'user/login', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        method: 'POST'
    });

    return fetch(request).then((response) => { return response.json() }).catch((error) => { return error });
}
