import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './styles.module.css';
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";

// ProductTable ...
class ProductTable extends React.Component {
    render() {
        return (
            <>
                <TableContainer component={Paper} className={styles.table}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">{"Image"}</TableCell>
                                <TableCell align="left">{"Name"}</TableCell>
                                <TableCell align="left">{"Price"}</TableCell>
                                <TableCell align="left" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.products.map((item) => (
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
                                            aria-label="info"
                                            onClick={() => { this.props.targetItem(item) }}
                                        >
                                            <MenuIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }
}

export default (ProductTable);

ProductTable.propTypes = {
    products: PropTypes.array.isRequired,
    targetItem: PropTypes.func.isRequired,
};
