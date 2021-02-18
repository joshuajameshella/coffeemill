import React from 'react';
import styles from './styles.module.css';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Login is the entrypoint for admin users to enter their password, and store the result in local storage.
// If the password matches a known entry, they are granted access to the admin page.
class Login extends React.Component {
    state = {
        tokenInput: ""
    }

    handleChange = (event) => {
        this.setState({
            tokenInput: event.target.value,
        });
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
                    label={"Password"}
                    type={'password'}
                    defaultValue={""}
                    className={styles.input}
                    style={{ margin: '0px 25% 0px 25%' }}
                    onChange={(e) => this.handleChange(e)}
                />
                <Button
                    onClick={() => {
                        localStorage.setItem('token', this.state.tokenInput);
                        window.location.href = '/admin';
                    }}
                    style={{ margin: '20px 40% 0px 40%' }}
                    className={styles.button}
                    variant={"outlined"}
                    >{"Submit"}</Button>
            </form>
        );
    }
}

export default (Login);
