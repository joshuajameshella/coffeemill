import React from "react";
import PropTypes from "prop-types";
import styles from './styles.module.css';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import MenuModal from '../MenuModal';

// MenuCard ...
class MenuCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            target: {},
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    handleClose = () => {
        this.setState({
            modalOpen: false
        })
    }

    toggleModal = (item) => {
        this.setState({
            target: item,
            modalOpen: !this.state.modalOpen,
        });
    }

    render() {
        const item = this.props.properties;
        return (
            <>
                <Grid item xs={12} sm={6} md={3}>
                    <ButtonBase
                        focusRipple
                        key={item.name}
                        className={styles.menu_card}
                        onClick={() => {this.toggleModal(item)}}
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className={styles.cover_image}
                        />

                        <div className={styles.cover_overlay} />

                        <div className={styles.text_container}>
                            <p className={styles.cover_text}>{`${item.name}`}</p>
                        </div>

                    </ButtonBase>
                </Grid>

                {this.state.modalOpen ?
                    <MenuModal
                        onClose={this.handleClose}
                        properties={this.state.target}
                    />
                : ''}
            </>
        );
    }
}

export default (MenuCard);

MenuCard.propTypes = {
    properties: PropTypes.object.isRequired,
};

