import React from 'react';
import styles from './styles.module.css';
import { StyledTabs, StyledTab } from './customStyles';
import Grid from "@material-ui/core/Grid";
import MenuCard from "../../components/MenuCard";
import { MobileView } from "react-device-detect";
import { GetAllProducts } from '../../queries/index';

// Menu is the page which contains the data for each item sold at the shop.
// It is separated into two categories which are shown on different tabs.
class Menu extends React.Component {

    // Coffee is stored in state, as this will be used to test the API call later.
    state = {
        value: 0,
        coffee: [],
        treats: [],
        cakes: [],
    };

    componentDidMount() {

        GetAllProducts("coffee").then((data) => {
            this.setState({ coffee: data });
        }).catch((err) => {
            console.log("Unable to retrieve Coffee Data: " + err);
        });

        GetAllProducts("treats").then((data) => {
            this.setState({ treats: data });
        }).catch((err) => {
            console.log("Unable to retrieve Treats Data: " + err);
        });

        GetAllProducts("cakes").then((data) => {
            this.setState({ cakes: data });
        }).catch((err) => {
            console.log("Unable to retrieve Cakes Data: " + err);
        });
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
                    {this.state.coffee.length === 0 ?
                        <p className={styles.menu_pointer}>{"Unable to find any coffee data..."}</p>
                        :
                        <Grid container spacing={3}>
                            {this.state.coffee.map((item) => {
                                return (
                                    <MenuCard key={item._id} properties={item} />
                                );
                            })}
                        </Grid>
                    }
                </div>

                <div hidden={this.state.value !== 1}>
                    {this.state.coffee.length === 0 ?
                        <p className={styles.menu_pointer}>{"Unable to find any treats data..."}</p>
                        :
                        <Grid container spacing={3}>
                            {this.state.treats.map((item) => {
                                return (
                                    <MenuCard key={item._id} properties={item} />
                                );
                            })}
                        </Grid>
                    }
                </div>

                <div hidden={this.state.value !== 2}>
                    {this.state.cakes.length === 0 ?
                        <p className={styles.menu_pointer}>{"Unable to find any cake data..."}</p>
                        :
                        <Grid container spacing={3}>
                            {this.state.cakes.map((item) => {
                                return (
                                    <MenuCard key={item._id} properties={item} />
                                );
                            })}
                        </Grid>
                    }
                </div>

            </div>
        );
    }
}

export default (Menu);
