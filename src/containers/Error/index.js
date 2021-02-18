import React from 'react';
import styles from './styles.module.css';
import Button from '@material-ui/core/Button';
import display from '../../images/404.png';

// Error is the 404 page for any unknown endpoints
class Error extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <img src={display} alt={"404 sketch"} className={styles.display} />
                <p className={styles.text}>{"Oh crumbs... We're unable to find the page you are looking for !"}</p>
                <Button
                    href={"/"}
                    variant={"outlined"}
                    className={styles.button}
                    style={{ margin: '50px calc(50% - 100px) 50px calc(50% - 100px)' }}
                >{"Take Me Back"}</Button>
            </div>
        );
    }
}

export default (Error);
