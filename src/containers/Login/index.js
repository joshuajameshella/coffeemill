import React from 'react';
import styles from './styles.module.css';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { UserLogin } from '../../queries/user';

// Login is the entrypoint for admin users to enter their password, and store the result in local storage.
// If the password matches a known entry, they are granted access to the admin page.
class Login extends React.Component {
    state = {
        username: '',
        password: '',
        error: '',
    }

    render() {
        return (

            <form className={styles.container}>

                <h1 className={styles.header}>
                    {"Admin Login"}
                </h1>

                <p className={styles.subText}>
                    {"Enter your password in the text field below to access your account"}
                </p>

                <TextField
                    required
                    variant={'outlined'}
                    label={"Username"}
                    defaultValue={this.state.username}
                    className={styles.input}
                    style={{ margin: '0px 25% 10px 25%' }}
                    onChange={(e) => {
                        this.setState({ username: e.target.value })
                    }}
                />

                <TextField
                    required
                    variant={'outlined'}
                    label={"Password"}
                    type={'password'}
                    defaultValue={this.state.username}
                    className={styles.input}
                    style={{ margin: '0px 25% 0px 25%' }}
                    onChange={(e) => {
                        this.setState({ password: e.target.value })
                    }}
                />

                <Button
                    onClick={() => {
                        UserLogin(this.state.username, this.state.password)
                            .then((response) => {
                                if (response.token) {
                                    localStorage.setItem('JWT_token', response.token);
                                    window.location.href = '/admin';
                                } else {
                                    localStorage.clear();
                                    this.setState({ error: 'Login info not recognised' });
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                                this.setState({ error: 'Error on server...' });
                            });
                    }}
                    style={{ margin: '20px 40% 0px 40%' }}
                    className={styles.button}
                    variant={"outlined"}
                    >{"Submit"}</Button>

                <p className={styles.error_message}>{this.state.error}</p>
            </form>
        );
    }
}

export default (Login);
