import React from 'react';
import styles from './styles.module.css';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import TableContainer from "@material-ui/core/TableContainer";
import MessageModal from "../../components/MessageModal";
import { GetAllMessages } from '../../queries/contact';

// Messages ...
class Messages extends React.Component {
    state = {
        messages: [],
        messageTarget: '',
        messageDialogOpen: false,
    }

    componentDidMount() {
        this.reloadData();
    }

    reloadData = () => {
        GetAllMessages().then((data) => {
            if (data) { this.setState({ messages: data }) }
        });
    }

    handleDialogClose = () => {
        this.setState({ messageDialogOpen: false });
    }

    render() {
        return (
            <div className={styles.container}>
                <TableContainer component={Paper} >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">{"Date"}</TableCell>
                                <TableCell align="left">{"Name"}</TableCell>
                                <TableCell align="left">{"Viewed"}</TableCell>
                                <TableCell align="left" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.messages.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell scope="row">
                                        {new Date(item.timestamp).toLocaleDateString(
                                            "en-US", {year: 'numeric', month: 'long', day: 'numeric'})}
                                    </TableCell>
                                    <TableCell scope="row">{item.name ? item.name : '--'}</TableCell>
                                    <TableCell scope="row">{`${item.viewed ? '' : 'New Message!'}`}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            aria-label="info"
                                            onClick={() => {
                                                this.setState({ messageTarget: item._id, messageDialogOpen: true });
                                                setTimeout(() => {this.reloadData()}, 1000)
                                            }}
                                        >
                                            <MenuIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {this.state.messageDialogOpen ?
                    <MessageModal
                        onClose={this.handleDialogClose}
                        data={this.state.messageTarget}
                    /> : ''}
            </div>
        );
    }
}

export default (Messages);
