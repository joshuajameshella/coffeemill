import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import ProductForm from '../ProductForm';
import styles from './styles.module.css';

// AdminModal is the display shown to the user when editing or creating a product
class AdminModal extends React.Component {
    render() {
        return (
            <Dialog open={true} onClose={this.props.onClose} fullWidth maxWidth="lg" >

                <div className={styles.dialog_body}>

                    <h1 className={styles.dialog_title}>{`${this.props.formFunction} Product`}</h1>

                    <div className={styles.divider} />

                    <ProductForm
                        onClose={this.props.onClose}
                        formFunction={this.props.formFunction}
                        initialValues={this.props.initialValues}
                        onSubmit={this.props.onSubmit}
                    />

                </div>
            </Dialog>
        );
    }
}

export default (AdminModal);

AdminModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    formFunction: PropTypes.string.isRequired,
    initialValues: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
};
