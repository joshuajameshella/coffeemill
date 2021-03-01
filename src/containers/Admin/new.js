import React from "react";
import { v4 as uuidv4 } from 'uuid';
import Button from "@material-ui/core/Button";
import { UploadImage } from "../../queries/image";

class New extends React.Component {
    state = {
        image: {},
    };

    render() {
        return (
            <>
                <form encType="multipart/form-data">

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            this.setState({
                                image: {
                                    data: URL.createObjectURL(e.target.files[0])
                                }
                            })
                        }}
                    />

                    <Button
                        onClick={() => {

                            // Set a new unique image identifier
                            const UUID = uuidv4();

                            UploadImage(this.state.image, UUID).then(() => {
                                console.log("https://coffeemillandcakesstorage.s3.eu-west-2.amazonaws.com/"+UUID+".jpg")
                                // TODO : If image upload successful, add data to MongoDB
                            }).catch(() => {
                                // TODO : Return error to user
                            });
                        }}
                    >
                        UPLOAD
                    </Button>

                </form>

            </>
        );
    }
}

export default (New);
