
let url = 'http://192.168.0.36:8080/';
// let url = "http://3.14.10.121:8080/"

export function GetProduct(category, id) {
    const request = new Request(url + category + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'GET'
    });

    return MakeRequest(request);
}

export function GetAllProducts(category, adminView) {

    const request = new Request(url + category, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET'
    });

    if (adminView) {
        request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('JWT_token'));
    }

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
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('JWT_token')
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
        priority: data.priority,
        visible: data.visible,
    }

    const request = new Request(url + category + '/' + data.id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('JWT_token')
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

export function RemoveProduct(category, id) {

    const request = new Request(url + category + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('JWT_token')
        },
        method: 'DELETE'
    });

    return fetch(request).then(res => {
        return {
            status: res.status,
            message: 'Successfully removed product data'
        };
    }).catch(res => {
        return {
            status: res.status,
            message: 'Unable to remove product data'
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

