import React from 'react';
import styles from './styles.module.css';
import { StyledTabs, StyledTab } from './customStyles';
import Grid from "@material-ui/core/Grid";
import MenuCard from "../../components/MenuCard";
import { MobileView } from "react-device-detect";
import { GetAllProducts } from '../../queries/product';
import CircularProgress from '@material-ui/core/CircularProgress';

// Menu is the page which contains the data for each item sold at the shop.
// It is separated into two categories which are shown on different tabs.
class Menu extends React.Component {

    // Coffee is stored in state, as this will be used to test the API call later.
    state = {
        value: 0,
        coffee: {
            data: [],
            loading: true
        },
        treats: {
            data: [],
            loading: true
        },
        cakes: {
            data: [],
            loading: true
        },
    };

    componentDidMount() {

        GetAllProducts("coffee", false).then((data) => {
            if (data) { this.setState({ coffee: { data: data, loading: false } }) }
        }).catch((err) => {
            console.log("Unable to retrieve Coffee Data: " + err);
        });

        GetAllProducts("treats", false).then((data) => {
            if (data) { this.setState({ treats: { data: data, loading: false } }) }
        }).catch((err) => {
            console.log("Unable to retrieve Treats Data: " + err);
        });

        GetAllProducts("cakes", false).then((data) => {
            if (data) { this.setState({ cakes: { data: data, loading: false } }) }
        }).catch((err) => {
            console.log("Unable to retrieve Cakes Data: " + err);
        });

        // After 10 seconds, force loading to stop
        setTimeout(() => {
            this.setState({ coffee: { data: this.state.coffee.data, loading: false } });
            this.setState({ treats: { data: this.state.treats.data, loading: false } });
            this.setState({ cakes: { data: this.state.cakes.data, loading: false } });
        }, 10 * 1000)
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
                    {this.state.coffee.loading ?
                        <CircularProgress className={styles.loading_icon} />
                        :
                        <>
                            {this.state.coffee.data.length === 0 ?
                                <p className={styles.menu_pointer}> {"Unable to find any product data..."} </p> : ''
                            }
                            <Grid container spacing={3}>
                                {this.state.coffee.data.map((item) => {
                                    return (
                                        <MenuCard key={item._id} properties={item} />
                                    );
                                })}
                            </Grid>
                        </>
                    }
                </div>

                <div hidden={this.state.value !== 1}>
                    {this.state.treats.loading ?
                        <CircularProgress className={styles.loading_icon} />
                        :
                        <>
                            {this.state.treats.data.length === 0 ?
                                <p className={styles.menu_pointer}> {"Unable to find any product data..."} </p> : ''
                            }
                            <Grid container spacing={3}>
                                {this.state.treats.data.map((item) => {
                                    return (
                                        <MenuCard key={item._id} properties={item} />
                                    );
                                })}
                            </Grid>
                        </>
                    }
                </div>

                <div hidden={this.state.value !== 2}>
                    {this.state.cakes.loading ?
                        <CircularProgress className={styles.loading_icon} />
                        :
                        <>
                            {this.state.cakes.data.length === 0 ?
                                <p className={styles.menu_pointer}> {"Unable to find any product data..."} </p> : ''
                            }
                            <Grid container spacing={3}>
                                {this.state.cakes.data.map((item) => {
                                    return (
                                        <MenuCard key={item._id} properties={item} />
                                    );
                                })}
                            </Grid>
                        </>
                    }
                </div>

            </div>
        );
    }
}

export default (Menu);
