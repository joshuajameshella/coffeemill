import React from "react";
import PropTypes from "prop-types";
import styles from './styles.module.css';

// ImageLink takes an object containing the information needed to render a full-width image with heading text and
// link information. It will be displayed as a tool to direct users to specific pages on the webpage.
class ImageLink extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <img
                    src={this.props.properties.image}
                    alt={this.props.properties.linkText}
                    className={styles.image}
                />

                <div className={styles.text_container}>
                    <p className={styles.mainText}>{this.props.properties.mainText}</p>
                    <p className={styles.subText}>{this.props.properties.subText}</p>
                    <a href={this.props.properties.link} className={styles.linkText}>{this.props.properties.linkText}</a>
                </div>
            </div>
        );
    }
}

export default (ImageLink);

ImageLink.propTypes = {
    properties: PropTypes.object.isRequired,
};

// <p className={styles.linkText}>{this.props.properties.linkText}</p>
