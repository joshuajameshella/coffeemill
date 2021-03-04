import React, {useState} from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import unknown from "../../images/treats/Unknown.png";

// toBase64 takes the uploaded file, and encodes the image data into Base64
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

// ImageUpload is the component shown to the user when uploading / editing a product image
const ImageUpload = (props) => {
    const [imageData, setImageData] = useState(props.imageData);

    return (
        <>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    toBase64(e.target.files[0])
                        .then((res) => {
                            props.handleChange(res);
                            setImageData(res);
                        }).catch((err) => {
                            console.log(err); // TODO: Better error handling here
                        });
                }}
                className={styles.image_upload}
            />

            <div className={styles.image_display}>
                <img
                    src={ imageData === '' ? unknown : imageData }
                    alt={"No media uploaded"}
                    className={styles.image}
                />
            </div>

        </>
    );
}

export default (ImageUpload);

ImageUpload.propTypes = {
    imageData: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
};
