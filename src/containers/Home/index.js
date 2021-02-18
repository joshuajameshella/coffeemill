import React from 'react';
import styles from './styles.module.css';
import ImageGrid  from "../../components/ImageGrid";
import { ImageGridData, ImageLinkData } from './landingImages';
import ImageLink from "../../components/ImageLink";

// Home is the landing page for the CoffeeMill website.
class Home extends React.Component {
    render() {
        return (
            <div className={styles.container}>

                <ImageGrid images={ImageGridData} />

                {ImageLinkData.map((properties) => {
                    return(
                        <ImageLink key={properties.linkText} properties={properties} />
                    );
                })}

            </div>
        );
    }
}

export default (Home);
