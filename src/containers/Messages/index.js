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
        this.reloadData().then();
    }

    async reloadData() {
        GetAllMessages().then((data) => {
            if (data) { this.setState({ messages: data }) }
        });
    }

    handleDialogClose = () => {
        this.reloadData().then(() => {
            this.setState({ messageDialogOpen: false });
        });
    }

    render() {
        return (
            <div className={styles.container}>
                <h2 className={styles.page_title}>{'User Messages & Enquiries'}</h2>

                <TableContainer component={Paper} >
                    <Table>
                        <TableHead>
                            <TableRow >
                                <TableCell style={{ fontWeight: 'bold' }} align="left">{"Message Sent"}</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="left">{"Message From"}</TableCell>
                                <TableCell>{""}</TableCell>
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
                                    <TableCell align="left">{item.viewed ? '' :
                                        <div style={{ height: 10, width: 10, backgroundColor: 'green', borderRadius: '50%' }} />
                                    }</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            style={{ height: 15, width: 15 }}
                                            aria-label="info"
                                            onClick={() => {
                                                this.setState({ messageTarget: item._id, messageDialogOpen: true });
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
