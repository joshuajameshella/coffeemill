import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import styles from './styles.module.css';
import { GetMessage, RemoveMessage } from '../../queries/contact';
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

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

                    <h1 className={styles.message_title}>{'Message Info'}</h1>

                    <Divider />

                    <div className={styles.field_container}>
                        <p className={styles.message_info}>{'Message from: '}</p>
                        <p className={styles.message_info}>
                            {this.state.message.name ? this.state.message.name : 'Unknown'}
                        </p>
                    </div>

                    <div className={styles.field_container}>
                        <p className={styles.message_info}>{'Message sent at: '}</p>
                        <p className={styles.message_info}>
                            {new Date(this.state.message.timestamp).toLocaleDateString(
                                "en-US", {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}
                        </p>
                    </div>

                    <div className={styles.field_container}>
                        <p className={styles.message_info}>{'Their contact info: '}</p>
                        <p className={styles.message_info}>{this.state.message.contactInfo}</p>
                    </div>

                    <div className={styles.field_container}>
                        <p className={styles.message_info}>{'Their message: '}</p>
                        <p className={styles.message_info}>{this.state.message.message}</p>
                    </div>

                    <Button
                        fullWidth
                        variant={'outlined'}
                        style={{
                            marginTop: 50,
                            color: '#A71D00',
                            borderColor: '#A71D00'
                        }}
                        onClick={() => {
                            RemoveMessage(this.state.message._id).then((res) => {
                                if (res.status < 400) { this.props.onClose() }
                            });
                        }}

                    >{'Delete Message'}</Button>

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
