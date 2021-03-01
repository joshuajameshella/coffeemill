import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from "@material-ui/core/MenuItem";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import styles from './styles.module.css';
import Coffee from './coffee';
import New from './new';

// Admin is the terminal used by admin users to modify the website data. It sits behind a
// protected route, as a cost-effective security measure
class Admin extends React.Component {
    state = {
        value: "coffee",
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
                    <MenuItem value={"new"} style={{ padding: 20 }}>New</MenuItem>
                </TextField>

                <h1 className={styles.admin_header}>{"Admin Page"}</h1>

                <div className={styles.admin_body}>
                    {this.state.value === "coffee" ? <Coffee /> : ''}
                    {this.state.value === "new" ? <New /> : ''}
                </div>

            </>
        );
    }
}

export default (Admin);
