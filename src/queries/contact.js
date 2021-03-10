
let url = 'http://192.168.0.36:8080/';
// let url = "http://3.14.10.121:8080/"

export function AddMessage(data) {
    const payload = {
        name: data.name,
        contactInfo: data.contactInfo,
        message: data.message
    }

    const request = new Request(url + 'message', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        method: 'POST'
    });

    return fetch(request).then(res => {
        return res;
    }).catch(res => {
        return {
            status: res.status,
            message: 'Unable to upload message data'
        };
    });
}

export function GetAllMessages() {
    const request = new Request(url + 'message', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('JWT_token')
        },
        method: 'GET'
    });

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

export function GetMessage(id) {
    const request = new Request(url + `message/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('JWT_token')
        },
        method: 'GET'
    });

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