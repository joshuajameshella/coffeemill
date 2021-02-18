import React from 'react';
import styles from './styles.module.css';

// Admin is the terminal used by admin users to modify the website data. It sits behind a
// protected route, as a cost-effective security measure
class Admin extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <p className={styles.text}>{"Admin"}</p>
            </div>
        );
    }
}

export default (Admin);
