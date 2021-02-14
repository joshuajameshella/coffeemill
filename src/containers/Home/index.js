import React from 'react';
import styles from './styles.module.css';
import ImageGrid  from "../../components/ImageGrid";
import { ImageData } from './landingImages';

// Home is the landing page for the CoffeeMill website.
class Home extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <ImageGrid images={ImageData} />
            </div>
        );
    }
}

export default (Home);
