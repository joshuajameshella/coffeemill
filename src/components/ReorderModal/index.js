import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import styles from './styles.module.css';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { GetAllProducts, EditProduct } from '../../queries/product';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Button from "@material-ui/core/Button";

// ReorderModal is the pop-up menu shown when the admin user wishes to change the 'priority' rating
// of certain products. This means that best-selling items can be positioned near the top of the page.
class ReorderModal extends React.Component {
    state = {
        products: []
    }

    componentDidMount() {
        GetAllProducts(this.props.target, true)
            .then((res) => {
                this.setState({ products: res });
            })
            .catch((err) => {
                console.log(err);
                // TODO: Show error to user
            })
    }

    increaseIndex = (index) => {
        let original = this.state.products[index - 1];
        let replace = this.state.products[index];
        const Products = this.state.products;
        Products[index - 1] = replace;
        Products[index] = original;
        this.setState({
            products: Products
        });
    };

    decreaseIndex = (index) => {
        let original = this.state.products[index + 1];
        let replace = this.state.products[index];
        const Products = this.state.products;
        Products[index + 1] = replace;
        Products[index] = original;
        this.setState({
            products: Products
        });
    };

    render() {
        return (
            <Dialog open={true} onClose={this.props.onClose} fullWidth maxWidth="lg" >

                <div className={styles.dialog_body}>

                    <h1 className={styles.dialog_title}>{`Reorder Products`}</h1>

                    <IconButton
                        aria-label="close"
                        onClick={this.props.onClose}
                        style={{ position: 'absolute', top: 15, right: 25 }}
                    >
                        <CloseIcon/>
                    </IconButton>

                    <div className={styles.divider} />

                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">{"Image"}</TableCell>
                                    <TableCell align="left">{"Name"}</TableCell>
                                    <TableCell align="left">{"Price"}</TableCell>
                                    <TableCell align="left" />
                                    <TableCell align="left" />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.products.map((item, index) => (
                                    <TableRow key={item._id}>
                                        <TableCell scope="row">
                                            <div className={styles.image_container}>
                                                <img src={item.image} alt={"icon"} className={styles.image} />
                                            </div>
                                        </TableCell>
                                        <TableCell scope="row">{item.name}</TableCell>
                                        <TableCell align="left">{`£ ${item.price}`}</TableCell>

                                        <TableCell align="right">
                                            <IconButton
                                                aria-label="Move Up"
                                                disabled={index <= 0}
                                                onClick={() => this.increaseIndex(index)}
                                            ><KeyboardArrowUpIcon/>
                                            </IconButton>
                                        </TableCell>

                                        <TableCell align="right">
                                            <IconButton
                                                aria-label="Move Down"
                                                disabled={index >= this.state.products.length-1}
                                                onClick={() => this.decreaseIndex(index)}
                                            ><KeyboardArrowDownIcon/>
                                            </IconButton>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Button
                        fullWidth={true}
                        variant="outlined"
                        style={{ margin: '20px 0 20px 0' }}
                        onClick={() => {
                            this.state.products.forEach((product, index) => {
                                const productData = {
                                    id: product._id,
                                    name: product.name,
                                    price: product.price,
                                    image: product.image,
                                    description: product.description,
                                    priority: index + 1,
                                    visible: product.visible,
                                }
                                EditProduct(productData, this.props.target)
                                    .then(() => {})
                                    .catch((err) => { console.log(err) })
                            });
                            this.props.onClose();
                            this.props.onSubmit({ status: 'success', message: 'Successfully Re-ordered Products!', open: true });
                        }}
                    >{`Save product order`}</Button>

                </div>
            </Dialog>
        );
    }
}

export default (ReorderModal);

ReorderModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    target: PropTypes.string.isRequired,
};
