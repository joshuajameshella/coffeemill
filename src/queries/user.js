
let url = 'http://192.168.0.36:8080/';
// let url = "http://3.14.10.121:8080/"

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
