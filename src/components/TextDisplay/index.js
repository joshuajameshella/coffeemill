import React from "react";
import PropTypes from "prop-types";
import styles from './styles.module.css';

// TextDisplay takes the array of paragraph content, and renders each paragraph with an image.
// Every other paragraph structure of image:text is reversed to break the content into more manageable sizes.
class TextDisplay extends React.Component {
    render() {
        return (
            <>
                {this.props.content.map((paragraph) => {
                    return(
                        <div
                            key={paragraph.image.description}
                            className={styles.container}
                        >

                            <img
                                src={paragraph.image.path}
                                alt={paragraph.image.description}
                                className={styles.image}
                            />

                            {paragraph.text.map((sentence) => {
                                return (
                                    <p
                                        key={sentence}
                                        className={styles.text}
                                    >
                                        {sentence}
                                    </p>
                                );
                            })}

                        </div>
                    );
                })}
            </>
        );
    }
}

export default (TextDisplay);

TextDisplay.propTypes = {
    content: PropTypes.array.isRequired,
};
