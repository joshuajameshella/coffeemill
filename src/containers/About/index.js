import React from 'react';
import styles from './styles.module.css';
import TextDisplay from "../../components/TextDisplay";

import { Paragraphs } from './contents';

// About is the information page for the CoffeeMill website.
class About extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <TextDisplay content={Paragraphs}/>
            </div>
        );
    }
}

export default (About);
