import React from 'react';
import styles from './styles.module.css';
import MenuCard from "../../components/MenuCard";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { MobileView } from "react-device-detect";
import { Coffee } from './coffee';
import { Cakes } from './cakes';
import { StyledTabs, StyledTab } from './customStyles';

// TabPanel is the component which contains the contents for each tab
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

// Menu is the page which contains the data for each item sold at the shop.
// It is separated into two categories which are shown on different tabs.
class Menu extends React.Component {
    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        return (
            <div className={styles.container}>

                <div className={styles.tab_container}>
                    <StyledTabs value={this.state.value} onChange={this.handleChange} aria-label="styled tabs example">
                        <StyledTab label="Coffee" />
                        <StyledTab label="Cakes" />
                    </StyledTabs>
                </div>

                <MobileView>
                    <p className={styles.menu_pointer}>{" - Click image for more information - "}</p>
                </MobileView>

                <TabPanel value={this.state.value} index={0}>
                    <Grid container spacing={3}>
                        {Coffee.map((item, index) => {
                            return (
                                <MenuCard key={item.name + index} properties={item} />
                            );
                        })}
                    </Grid>
                </TabPanel>

                <TabPanel value={this.state.value} index={1}>
                    <Grid container spacing={3}>
                        {Cakes.map((item, index) => {
                            return (
                                <MenuCard key={item.name + index} properties={item} />
                            );
                        })}
                    </Grid>
                </TabPanel>

            </div>
        );
    }
}

export default (Menu);
