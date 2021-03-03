
const url = 'http://192.168.0.36:8080/coffee';

export function GetCoffee() {

    const request = new Request(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
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

export function AddCoffee(data) {
    const payload = {
        name: data.name,
        price: data.price,
        image: data.image,
        description: data.description,
        visible: data.visible,
    }

    const request = new Request(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        method: 'POST'
    });

    return fetch(request).then(res => {
        return {
            status: res.status,
            message: 'Successfully uploaded coffee data'
        };
    }).catch(res => {
        return {
            status: res.status,
            message: 'Unable to upload coffee data'
        };
    });
}
