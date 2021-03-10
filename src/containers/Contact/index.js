import React from 'react';
import styles from './styles.module.css';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { AddMessage } from '../../queries/contact';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";


// Set the length of time the window remains open after data is submitted (ms)
const modalTimeout = 5000;

// Alert is the function which renders the Success or Failure of Admin functions
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


// Contact ...
class Contact extends React.Component {
    state = {
        name: {
           value: '',
        },
        contactInfo: {
            value: '',
            error: false,
        },
        message: {
            value: '',
            error: false,
        },
        snackbar: {
            severity: 'success',
            message: '',
            open: false
        },
    }

    // Validate that the required inputs contain data
    async validateInputs(values) {
        this.setState({ contactInfo: { value: values.contactInfo.value, error: false } });
        this.setState({ message: { value: values.contactInfo.value, error: false } });
        if (values.contactInfo.value === '') {
            this.setState({ contactInfo: { value: values.contactInfo.value, error: true } });
        }
        if (values.message.value === '') {
            this.setState({ message: { value: values.message.value, error: true } });
        }
    }

    render() {
        return (
            <form className={styles.container}>

                <h1 className={styles.header}>
                    {"Contact Us"}
                </h1>

                <p className={styles.subText}>
                    {"Fill in the fields below, and send us a message!"}
                </p>

                <TextField
                    variant={'outlined'}
                    label={"Your Name"}
                    defaultValue={this.state.name.value}
                    fullWidth={true}
                    style={{ margin: '0px 0 10px 0' }}
                    onChange={(e) => {
                        this.setState({ name: { value: e.target.value } })
                    }}
                />

                <TextField
                    required
                    variant={'outlined'}
                    label={"Your Contact Info"}
                    defaultValue={this.state.contactInfo.value}
                    fullWidth={true}
                    style={{ margin: '0px 0 10px 0' }}
                    onChange={(e) => {
                        this.setState({ contactInfo: { value: e.target.value, error: false } })
                    }}
                    error={this.state.contactInfo.error}
                    helperText={this.state.contactInfo.error ? 'We need to know who to reply to' : ''}
                />

                <TextField
                    required
                    variant={'outlined'}
                    label={"Your Message"}
                    defaultValue={this.state.message.value}
                    fullWidth={true}
                    multiline={true}
                    rowsMax={4}
                    rows={4}
                    style={{ margin: '0px 0 10px 0' }}
                    onChange={(e) => {
                        this.setState({ message: { value: e.target.value, error: false } })
                    }}
                    error={this.state.message.error}
                />

                <Button
                    fullWidth={true}
                    style={{ margin: '0px 0 10px 0' }}
                    variant={"outlined"}
                    onClick={() => {
                        this.validateInputs(this.state).then(() => {
                            if (!this.state.contactInfo.error && !this.state.message.error) {
                                const messageData = {
                                    name: this.state.name.value,
                                    contactInfo: this.state.contactInfo.value,
                                    message: this.state.message.value
                                };
                                AddMessage(messageData).then((res) => {
                                    if (res) {
                                        if (res.status > 400) {
                                            this.setState({ snackbar: {
                                                severity: 'error',
                                                message: 'Unable to send message',
                                                open: true
                                            } });
                                        } else {
                                            this.setState({
                                                snackbar: {
                                                    severity: 'success',
                                                    message: 'Message Sent!',
                                                    open: true
                                                },
                                            });
                                            setTimeout(() => {
                                                // When message sent, go to homepage
                                                this.props.history.push('/');
                                            }, modalTimeout);
                                        }
                                    } else {
                                        this.setState({ snackbar: {
                                            severity: 'error',
                                            message: 'Unable to send message',
                                            open: true
                                        } });
                                    }
                                });
                            }
                        });
                    }}
                    >{"Send Message"}
                </Button>

                <Snackbar
                    open={this.state.snackbar.open}
                    autoHideDuration={modalTimeout}

                    onClose={() => {
                        this.setState({
                            snackbar: {
                                open: false,
                                severity: 'success',
                                message: ''
                            }
                        });
                    }}
                >
                    <Alert
                        onClose={() => {
                            this.setState({
                                snackbar: {
                                    open: false,
                                    severity: 'success',
                                    message: ''
                                }
                            });
                        }}
                        severity={this.state.snackbar.severity}
                    >
                        {this.state.snackbar.message}
                    </Alert>
                </Snackbar>

            </form>
        );
    }
}

export default (Contact);
