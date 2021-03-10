import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import styles from './styles.module.css';
import { GetMessage } from '../../queries/contact';

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

// MessageModal ...
class MessageModal extends React.Component {

    state = {
        message: {}
    }

    componentDidMount() {
        GetMessage(this.props.data).then((res) => {
            if (res) {
                this.setState({ message: res });
            }
        });
    }

    render() {
        return (
            <Dialog open={true} onClose={this.props.onClose} fullWidth maxWidth="lg" >

                <div className={styles.dialog_body}>

                    <p className={styles.message_title}>{`Message from: ${this.state.message.name ? this.state.message.name : 'Unknown'}`}</p>

                    <p>
                        {new Date(this.state.message.timestamp).toLocaleDateString(
                        "en-US", {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}
                    </p>

                    <p className={styles.message_body}>{this.state.message.message}</p>

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

export default (MessageModal);

MessageModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    data: PropTypes.string.isRequired,
};
