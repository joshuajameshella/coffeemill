
export function GetCoffee() {
    // const request = new Request('http://127.0.0.1:8080/coffee', { method: 'GET' });
    const request = new Request('http://192.168.0.36:8080/coffee', { method: 'GET' });

    request.headers.set("Access-Control-Allow-Origin", "*");
    request.headers.set("Accept-Encoding", "gzip, deflate, br");

    return fetch(request)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Something went wrong on api server!');
            }
        })
        .then(response => {
            return response.data;
        }).catch(error => {
            console.error(error);
        });
}