import React from "react";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import styles from './styles.module.css';
import {PAGES, SOCIAL_MEDIA} from "./links";

// SlideInMenu is the hidden menu component for smaller screen displays.
class SlideInMenu extends React.Component {
    state = {
        drawerOpen: false
    }

    toggleDrawer = () => {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }

    render() {
        return (
            <div className={styles.menuIcon} data-testid="slide-in-menu">
                <IconButton
                    color="inherit"
                    aria-label="open menu"
                    onClick={this.toggleDrawer}
                >
                    <MenuIcon />
                </IconButton>

                <SwipeableDrawer
                    anchor="right"
                    open={this.state.drawerOpen}
                    onClose={this.toggleDrawer}
                    onOpen={this.toggleDrawer}
                >
                    <div className={styles.closeMenuIcon}>
                        <IconButton onClick={this.toggleDrawer}>
                            <ChevronRightIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {PAGES.map((page) => {
                            return (
                                <ListItem button onClick={() => this.toggleDrawer()} key={page.name}>
                                    <a
                                        key={page.name}
                                        href={page.link}
                                        className={styles.navbar_link}
                                    >
                                        {page.name}
                                    </a>
                                </ListItem>
                            )
                        })}

                        <div className={styles.social_container}>
                            {SOCIAL_MEDIA.map((social) => {
                                return (
                                    <a
                                        href={"/"}
                                        key={social.description}
                                        onClick={() => {
                                            this.toggleDrawer();
                                            window.open(social.link,'_blank');
                                        }}
                                    >
                                        <img
                                            src={social.icon}
                                            alt={social.description}
                                            className={styles.social_link}
                                        />
                                    </a>
                                );
                            })}
                        </div>

                    </List>
                </SwipeableDrawer>
            </div>
        );
    }
}

export default SlideInMenu;