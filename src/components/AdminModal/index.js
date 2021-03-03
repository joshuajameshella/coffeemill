import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import ProductForm from '../ProductForm';
import styles from './styles.module.css';
import unknown from '../../images/treats/Unknown.png';

// AdminModal is the display shown to the user when editing or creating a product
class AdminModal extends React.Component {
    state = {
        image: "",
    };

    render() {
        return (
            <Dialog open={true} onClose={this.props.onClose} fullWidth maxWidth="lg" >

                <div className={styles.dialog_body}>

                    <h1 className={styles.dialog_title}>Add New Product</h1>

                    <div className={styles.divider} />

                    <div className={styles.image_container}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                this.setState({
                                    image: URL.createObjectURL(e.target.files[0])
                                })
                            }}
                            className={styles.image_upload}
                        />
                        <div className={styles.image_display}>
                            {this.state.image === '' ?
                                <img src={unknown} alt={"No media uploaded"} className={styles.image}  />
                                :
                                <img src={this.state.image} alt={"uploaded media"} className={styles.image}  />
                            }
                        </div>
                    </div>

                    <div className={styles.info_container}>
                        <ProductForm image={this.state.image} />
                    </div>

                </div>
            </Dialog>
        );
    }
}

export default (AdminModal);

AdminModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};
