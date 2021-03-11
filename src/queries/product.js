// product.js
// -----------------
// This file contains all the CRUD queries relating to the 'coffees, treats & cakes' database collections.

let url = "http://3.14.10.121:8080/"

// GetProduct retrieves a specific product by collection & ID. This is an open request, so any user can use the query.
export function GetProduct(category, id) {
    const request = new Request(url + `${category}/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'GET'
    });

    return MakeRequest(request);
}

// GetAllProducts returns all products from a specific collection.
// 'adminView' is a boolean field which determines whether all products are returned, or just the publicly visible ones.
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

// AddProduct takes the product data & category and inserts it into the database. (Role-Protected)
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
        return res;
    }).catch(res => {
        return {
            status: res.status,
            message: 'Unable to upload product data'
        };
    });
}

// EditProduct takes the new product data & product category and updates the database record. (Role-Protected)
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

// RemoveProduct removes the product ID from the database collection. (Role-Protected)
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

// MakeRequest is the 'fetch' function used when making API requests.
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

