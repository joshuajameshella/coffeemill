import React from "react";
import styles from './styles.module.css';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from "../ProtectedRoute";

import NavigationBar from "../NavigationBar";
import Home from '../../containers/Home';
import About from '../../containers/About';
import Location from '../../containers/Location';
import Login from '../../containers/Login';
import Admin from '../../containers/Admin';
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
                        <Route exact path='/about' component={About} />

                        {/*<Route exact path='/menu' component={Menu} />*/}
                        <Route exact path='/location' component={Location} />
                        {/*<Route exact path='/contact' component={OrderContact} />*/}

                        <ProtectedRoute path={'/admin'} component={Admin}/>
                        <Route exact path='/login' component={Login} />
                        <Route component={Error} />
                    </Switch>
                </div>
            </>
        );
    }
}

export default (App);
