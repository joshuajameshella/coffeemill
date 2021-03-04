
let url = 'http://192.168.0.36:8080/';

export function GetProduct(category, id) {
    const request = new Request(url + category + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET'
    });

    return MakeRequest(request);
}

export function GetAllProducts(category) {
    const request = new Request(url + category, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET'
    });

    return MakeRequest(request);
}

export function AddProduct(data, category) {
    const payload = {
        name: data.name,
        price: data.price,
        image: data.image,
        description: data.description,
        visible: data.visible,
    }

    const request = new Request(url + category, {
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

export function EditProduct(data, category) {
    const payload = {
        name: data.name,
        price: data.price,
        image: data.image,
        description: data.description,
        visible: data.visible,
    }

    const request = new Request(url + category + '/' + data.id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        method: 'PUT'
    });

    return fetch(request).then(res => {
        return {
            status: res.status,
            message: 'Successfully updated coffee data'
        };
    }).catch(res => {
        return {
            status: res.status,
            message: 'Unable to update coffee data'
        };
    });
}


function MakeRequest(request) {
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

