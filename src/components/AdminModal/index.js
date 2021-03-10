import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import ProductForm from '../ProductForm';
import styles from './styles.module.css';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

// AdminModal is the display shown to the user when editing or creating a product
class AdminModal extends React.Component {
    render() {
        return (
            <Dialog open={true} onClose={this.props.onClose} fullWidth maxWidth="lg" >

                <div className={styles.dialog_body}>

                    <h1 className={styles.dialog_title}>{`${this.props.formFunction} Product`}</h1>

                    <IconButton
                        aria-label="close"
                        onClick={this.props.onClose}
                        style={{ position: 'absolute', top: 15, right: 25 }}
                    >
                        <CloseIcon/>
                    </IconButton>

                    <div className={styles.divider} />

                    <ProductForm
                        onClose={this.props.onClose}
                        onSubmit={this.props.onSubmit}
                        formFunction={this.props.formFunction}
                        initialValues={this.props.initialValues}
                    />

                </div>
            </Dialog>
        );
    }
}

export default (AdminModal);

AdminModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    formFunction: PropTypes.string.isRequired,
    initialValues: PropTypes.object.isRequired,
};
