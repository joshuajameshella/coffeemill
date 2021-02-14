import React from 'react';
import PropTypes from "prop-types";
import styles from './styles.module.css';
import { PAGES, SOCIAL_MEDIA } from './links.js';
import logo_full from '../../images/logo.png';
import logo_compressed from '../../images/logo_compressed.png';
import SlideInMenu from "./slideInMenu";
import IconButton from '@material-ui/core/IconButton';

// NavigationBar is the component which manages the links to other pages.
// Depending on the window width, the NavBar is either a fixed menu, or a slide-in menu.
class NavigationBar extends React.Component {
    render() {
        return (
            <div className={styles.navbar} >
                <a href={"/"}>
                    <img
                        alt={'Coffee Mill & Cakes logo'}
                        src={this.props.isMobile ? logo_full : logo_compressed}
                        className={styles.navbar_logo}
                    />
                </a>

                {this.props.isMobile ?
                    <SlideInMenu />
                    :
                    <nav className={styles.navbar_container}>
                        {PAGES.map((page) => {
                            return (
                                <a
                                    key={page.name}
                                    href={page.link}
                                    className={styles.navbar_link}
                                >
                                    {page.name}
                                </a>
                            );
                        })}
                        <div className={styles.social_container}>
                            {SOCIAL_MEDIA.map((social) => {
                                return (
                                    <a
                                        href={"/"}
                                        key={social.description}
                                        onClick={() => window.open(social.link,'_blank')}
                                        // className={styles.social_link}
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
                    </nav>
                }
            </div>
        );
    }
}

export default NavigationBar;

NavigationBar.propTypes = {
    isMobile: PropTypes.bool.isRequired,
};

