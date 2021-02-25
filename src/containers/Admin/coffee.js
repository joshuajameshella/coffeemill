import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';

import { GetCoffee } from "../../queries/coffee";

class Coffee extends React.Component {
    state = {
        coffee: []
    }

    componentDidMount = () => {
        GetCoffee().then(json => {
            this.setState({ coffee: json });
        });
    };

    render() {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">{"Name"}</TableCell>
                            <TableCell align="left">{"Price"}</TableCell>
                            <TableCell align="left" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.coffee.map((item) => (
                            <TableRow key={item.name}>
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell align="left">{`£ ${item.price}`}</TableCell>
                                <TableCell align="right"><MenuIcon /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default (Coffee);