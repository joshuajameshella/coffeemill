// image.js
// -----------------
// This file contains all the CRUD queries relating to the 'images' database collection.
// All the following queries are role-protected.

let url = "http://3.14.10.121:8080/"

// UploadImage takes the image location, and encodes it into base64 before sending it via the API.
export async function UploadImage(imageData, uuid) {

    let payload = { image: imageData, name: uuid };
    const request = new Request(url + 'image', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('JWT_token')
        },
        method: 'POST',
        body: JSON.stringify(payload)
    });

    return fetch(request).then(res => {
        return {
            status: res.status,
            message: 'Successfully uploaded image'
        };
    }).catch(res => {
        return {
            status: res.status,
            message: 'Unable to upload image'
        };
    });
}

// DeleteImage takes the image ID, and removes the image from the S3 Bucket
export async function DeleteImage(uuid) {

    let payload = { id: uuid };
    const request = new Request(url + `image/${uuid}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('JWT_token')
        },
        method: 'DELETE',
        body: JSON.stringify(payload)
    });

    return fetch(request).then(res => {
        return res;
    }).catch(res => {
        return res;
    });
}

// UpdateImage takes the image UUID in question, and the new image data used to update it
export async function UpdateImage(uuid, imageData) {

    // Remove the old image from the S3 Bucket
    return DeleteImage(uuid)
        .then(() => {

            // If the old image has been successfully removed, add the new image
            return UploadImage(imageData, uuid)
                .then((res) => { return res })
                .catch((err) => { return err })
    }).catch((err) => { return err });
}
