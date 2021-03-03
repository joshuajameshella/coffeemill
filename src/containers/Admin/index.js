import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AdminModal from "../../components/AdminModal";
import ProductTable from "../../components/ProductTable";
import styles from './styles.module.css';
import { GetCoffee } from "../../queries/coffee";

// Admin is the terminal used by admin users to modify the website data. It sits behind a
// protected route, as a cost-effective security measure
class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "coffee",
            modalOpen: false,
            coffee: [],
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount = () => {
        GetCoffee().then(json => {
            this.setState({ coffee: json });
        });
    };

    handleClose = () => {
        this.setState({
            modalOpen: false
        })
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen,
        });
    }

    render() {
        return (
            <>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" >Admin</Typography>
                    </Toolbar>
                </AppBar>

                <div className={styles.admin_body}>

                    <h1 className={styles.admin_header}>{"Product Info"}</h1>

                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {this.toggleModal()}}
                        style={{ width: 200, margin: '0 calc(50% - 100px) 0 calc(50% - 100px)' }}
                    >
                        Add new product
                    </Button>

                    <TextField
                        select
                        onChange={(e) => {
                            this.setState({ value: e.target.value });
                        }}
                        value={this.state.value}
                        variant={'outlined'}
                        fullWidth={true}
                        style={{ margin: '20px 0 20px 0' }}
                    >
                        <MenuItem value={"coffee"} style={{ padding: 20 }}>Coffee</MenuItem>
                        <MenuItem value={"treats"} style={{ padding: 20 }}>Treats</MenuItem>
                        <MenuItem value={"cakes"} style={{ padding: 20 }}>Cakes</MenuItem>
                    </TextField>

                    {this.state.value === "coffee" ? <ProductTable products={this.state.coffee} /> : ''}
                    {this.state.value === "treats" ? <></> : ''}
                    {this.state.value === "cakes" ? <></> : ''}

                    {this.state.modalOpen ? <AdminModal onClose={this.handleClose} /> : ''}
                </div>

            </>
        );
    }
}

export default (Admin);
