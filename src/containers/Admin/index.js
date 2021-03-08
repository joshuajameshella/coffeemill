import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AdminModal from "../../components/AdminModal";
import ReorderModal from '../../components/ReorderModal';
import ProductTable from "../../components/ProductTable";
import styles from './styles.module.css';
import { GetAllProducts } from '../../queries/index';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// Set the length of time the window remains open after data is submitted (ms)
const modalTimeout = 5000;

// Alert is the function which renders the Success or Failure of Admin functions
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// JS style guide for MUI Button Component
const buttonStyling = {
    position: 'relative',
    float: 'left',
    width: 200,
    margin: '0 calc(25% - 100px) 0 calc(25% - 100px)'
}

// Admin is the terminal used by admin users to modify the website data. It sits behind a
// protected route, as a cost-effective security measure
class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "coffee",
            productModalOpen: false,
            rearrangeModalOpen: false,
            snackbar: {
                severity: 'success',
                message: '',
                open: false
            },
            formFunction: 'Create',
            targetData: {},
            coffee: [],
            treats: [],
            cakes: [],
        };
        this.toggleProductModal = this.toggleProductModal.bind(this);
    }

    componentDidMount = () => {
        this.populateData();
        this.setState({
            targetData: {
                _id: '',
                category: 'coffee',
                name: '',
                price: '',
                description: '',
                visible: true,
                image: '',
            }
        });
    }

    populateData = () => {
        GetAllProducts("coffee", true).then((data) => {
            this.setState({ coffee: data });
        }).catch((err) => {
            console.log("Unable to retrieve Coffee Data: " + err);
        });

        GetAllProducts("treats", true).then((data) => {
            this.setState({ treats: data });
        }).catch((err) => {
            console.log("Unable to retrieve Treats Data: " + err);
        });

        GetAllProducts("cakes", true).then((data) => {
            this.setState({ cakes: data });
        }).catch((err) => {
            console.log("Unable to retrieve Cakes Data: " + err);
        });
    }

    handleClose = () => {
        this.setState({
            productModalOpen: false,
            rearrangeModalOpen: false,
            formFunction: 'Create',
            targetData: {
                _id: '',
                category: 'coffee',
                name: '',
                price: '',
                description: '',
                visible: true,
                image: '',
            }
        })
    }

    toggleProductModal = () => {
        this.setState({
            productModalOpen: !this.state.productModalOpen,
        });
    }

    toggleRearrangeModal = () => {
        this.setState({
            rearrangeModalOpen: !this.state.rearrangeModalOpen,
        });
    }

    handleEditModal = (data) => {
        this.setState({
            formFunction: 'Edit',
            targetData: data,
            productModalOpen: true
        });
    }

    handleSnackbar = (data) => {
        this.populateData();
        this.setState({
            snackbar: data
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
                        onClick={() => {this.toggleProductModal()}}
                        style={buttonStyling}
                    >
                        Add new product
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {this.toggleRearrangeModal()}}
                        style={buttonStyling}
                    >
                        Reorder Products
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

                    {this.state.value === "coffee" ?
                        <ProductTable
                            products={this.state.coffee}
                            targetItem={(data) => {
                                data.category = 'coffee';
                                this.handleEditModal(data);
                            }}
                        />
                    : ''}
                    {this.state.value === "treats" ?
                        <ProductTable
                            products={this.state.treats}
                            targetItem={(data) => {
                                data.category = 'treats';
                                this.handleEditModal(data);
                            }}
                        />
                    : ''}
                    {this.state.value === "cakes" ?
                        <ProductTable
                            products={this.state.cakes}
                            targetItem={(data) => {
                                data.category = 'cakes';
                                this.handleEditModal(data);
                            }}
                        />
                    : ''}

                    {this.state.productModalOpen ?
                        <AdminModal
                            onClose={this.handleClose}
                            onSubmit={(data) => this.handleSnackbar(data)}
                            formFunction={this.state.formFunction}
                            initialValues={this.state.targetData}
                        />
                    : ''}

                    {this.state.rearrangeModalOpen ?
                        <ReorderModal
                            onClose={this.handleClose}
                            onSubmit={(data) => this.handleSnackbar(data)}
                            target={this.state.value}
                        />
                        : ''}
                </div>


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

            </>
        );
    }
}

export default (Admin);
