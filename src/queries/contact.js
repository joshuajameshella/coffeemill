// contact.js
// -----------------
// This file contains all the CRUD queries relating to the 'messages' database collection.
// All queries except for 'AddMessage' are role-protected.

let url = "http://3.14.10.121:8080/"

// AddMessage POST's a new message object to the database via the /message endpoint.
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

// GetAllMessages is an Admin request, and returns all messages currently in the database.
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

// GetMessage is an Admin request, and returns a specific message by ID from the database.
// This request also updates the message to be 'viewed', and so will no longer be considered 'unread'.
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

// RemoveMessage deletes a specific message by ID from the database.
export function RemoveMessage(id) {

    const request = new Request(url + `message/${id}`, {
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
            message: 'Successfully removed message data'
        };
    }).catch(res => {
        return {
            status: res.status,
            message: 'Unable to remove message data'
        };
    });
}
