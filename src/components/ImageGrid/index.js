import React from "react";
import PropTypes from "prop-types";
import styles from './styles.module.css';

// ImageGrid takes an array list of images; eg: [ [ ImageData1, ImageData2 ], [ ImageData3 ] ]
// And, for each image list in the array, renders a column of those images.
class ImageGrid extends React.Component {
    render() {
        return (
            <div className={styles.container} style={{ "--columnCount" : this.props.images.length }}>
                {this.props.images.map((imageList) => (
                    imageList.map((image, index) => {

                        // Generate the styling, based on the number of images in each column
                        const imageContainer = {
                            width: '100%',
                            height: `calc((100% / ${imageList.length}) - 5px)`,
                            marginBottom: 5,
                            overflow: 'hidden',
                        };

                        return(
                            <div style={imageContainer} key={image.image + index}>
                                <img
                                    src={image.image}
                                    alt={image.description}
                                    className={styles.image}
                                />
                            </div>
                        );
                    })
                ))}
            </div>
        );
    }
}

export default (ImageGrid);

ImageGrid.propTypes = {
    images: PropTypes.array.isRequired,
};
