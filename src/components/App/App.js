import React from "react";
import styles from './styles.module.css';
import { Switch, Route } from 'react-router-dom';

import NavigationBar from "../NavigationBar";
import Home from '../../containers/Home';
import Error from '../../containers/Error';

class App extends React.Component {
    state = {
        isMobile: window.innerWidth < 650
    }

    handleWindowResize = () => {
        this.setState({isMobile: window.innerWidth < 650})
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    render() {
        return (
            <>
                <NavigationBar isMobile={this.state.isMobile}/>

                <div className={this.state.isMobile ? styles.mobileDisplay : styles.desktopDisplay}>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        {/*<Route exact path='/menu' component={Menu} />*/}
                        {/*<Route exact path='/about' component={About} />*/}
                        {/*<Route exact path='/locations' component={Locations} />*/}
                        {/*<Route exact path='/contact' component={OrderContact} />*/}
                        <Route component={Error} />
                    </Switch>
                </div>
            </>
        );
    }
}

export default (App);
