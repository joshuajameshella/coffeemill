
let url = "http://192.168.0.36:8080/image";

// UploadImage takes the image location, and encodes it into base64 before sending it via the API.
export async function UploadImage(imagePath, uuid) {

    // Take the Blob URL where the image is made accessible
    let blob = await fetch(imagePath).then(r => r.blob());
    let reader = new window.FileReader();
    reader.onloadend = function() {

        let payload = { image: reader.result, name: uuid };
        const request = new Request(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
    };

    reader.readAsDataURL(blob);
}


export async function UploadImageTest(imageData, uuid) {

    let payload = { image: imageData, name: uuid };
    const request = new Request(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
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