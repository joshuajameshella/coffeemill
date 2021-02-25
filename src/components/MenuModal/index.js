import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import styles from './styles.module.css';

// buttonStyle is the styling component for the MaterialUI Button component
const buttonStyle = {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    border: '1px solid #505050',
    "&:hover": {
        backgroundColor: 'rgba(80, 80, 80, 0.5)'
    },
};

// MenuModal is the pop-up element which is rendered when a user clicks on an element on the menu page.
class MenuModal extends React.Component {
    render() {
        const item = this.props.properties;
        return (
            <Dialog open={true} onClose={this.props.onClose} fullWidth maxWidth="lg" >

                <div className={styles.dialog_body}>

                    <div className={styles.image_container}>
                        <img src={item.image} alt={item.name} className={styles.dialog_image} />
                    </div>

                    <div className={styles.text_container}>
                        <h1 className={styles.dialog_title}>{item.name}</h1>
                        <p className={styles.dialog_text}>{`£ ${item.price}`}</p>
                        {item.description.map((text, index) => (
                            <p
                                key={index}
                                className={styles.dialog_text}
                            >
                                {text}
                            </p>
                        ))}
                    </div>

                </div>

                {this.props.onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={this.props.onClose}
                        style={buttonStyle}
                    >
                        <CloseIcon/>
                    </IconButton>
                ) : null}
            </Dialog>
        );
    }
}

export default (MenuModal);

MenuModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    properties: PropTypes.object.isRequired,
};
