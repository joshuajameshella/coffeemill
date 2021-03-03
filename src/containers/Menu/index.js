import React from 'react';
import styles from './styles.module.css';
import { StyledTabs, StyledTab } from './customStyles';
import Grid from "@material-ui/core/Grid";
import MenuCard from "../../components/MenuCard";
import { MobileView } from "react-device-detect";

import { GetCoffee } from '../../queries/coffee';

// Data to be displayed on the Menu tabs
import { Treats } from './data/treats';
import { Cakes } from './data/cakes';

// Menu is the page which contains the data for each item sold at the shop.
// It is separated into two categories which are shown on different tabs.
class Menu extends React.Component {

    // Coffee is stored in state, as this will be used to test the API call later.
    state = {
        value: 0,
        coffee: [],
    };

    componentDidMount() {
        GetCoffee().then((data) => {
            this.setState({ coffee: data });
        }).catch((err) => {
            console.log("Unable to retrieve Coffee Data: " + err);
        })
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        return (
            <div className={styles.container}>

                <div className={styles.tab_container}>
                    <StyledTabs value={this.state.value} onChange={this.handleChange}>
                        <StyledTab label="Coffee" />
                        <StyledTab label="Treats" />
                        <StyledTab label="Cakes" />
                    </StyledTabs>
                </div>

                <MobileView>
                    <p className={styles.menu_pointer}>{" - Click image for more information - "}</p>
                </MobileView>

                <div hidden={this.state.value !== 0}>
                    <Grid container spacing={3}>
                        {this.state.coffee.map((item) => {
                            return (
                                <MenuCard key={item._id} properties={item} />
                            );
                        })}
                    </Grid>
                </div>

                <div hidden={this.state.value !== 1}>
                    <Grid container spacing={3}>
                        {Treats.map((item, index) => {
                            return (
                                <MenuCard key={item.name + index} properties={item} />
                            );
                        })}
                    </Grid>
                </div>

                <div hidden={this.state.value !== 2}>
                    <Grid container spacing={3}>
                        {Cakes.map((item, index) => {
                            return (
                                <MenuCard key={item.name + index} properties={item} />
                            );
                        })}
                    </Grid>
                </div>

            </div>
        );
    }
}

export default (Menu);
