import {withStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import React from "react";

export const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#380059',
        },
    },
})((props) => <Tabs {...props} centered TabIndicatorProps={{ children: <span /> }} />);

export const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: '#000',
        letterSpacing: 2,
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    },
}))((props) => <Tab disableRipple {...props} />);

