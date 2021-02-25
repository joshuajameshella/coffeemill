import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';

import styles from './styles.module.css';
import Coffee from './coffee';
import {MenuItem} from "@material-ui/core";

// Admin is the terminal used by admin users to modify the website data. It sits behind a
// protected route, as a cost-effective security measure
class Admin extends React.Component {
    state = {
        value: "coffee"
    };

    handleChange = (event) => {
        console.log(event);
        // const pageMap = ["coffee", "cake"];
        this.setState({ value: event });
    };

    render() {
        return (
            <>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" >Admin</Typography>
                    </Toolbar>
                </AppBar>

                <TextField
                    select
                    onChange={(e) => {
                        this.setState({ value: e.target.value });
                    }}
                    value={this.state.value}
                    variant={'outlined'}
                    className={styles.page_selector}
                >
                    <MenuItem value={"coffee"} style={{ padding: 20 }}>Coffee</MenuItem>
                    <MenuItem value={"cake"} style={{ padding: 20 }}>Cake</MenuItem>
                </TextField>



                <h1 className={styles.admin_header}>{"Admin Page"}</h1>

                <div className={styles.admin_body}>
                    {this.state.value === "coffee" ? <Coffee /> : ''}
                </div>
            </>

        );
    }
}

export default (Admin);
//
// <form action="/" encType="multipart/form-data" method="POST">
//     <input type="file" name="myImage" accept="image/*"/>
//     <input type="submit" value="Upload Photo"/>
// </form>