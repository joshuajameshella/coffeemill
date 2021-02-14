import React from "react";
import Home from '../../containers/Home';
import NavigationBar from "../NavigationBar";
import styles from './styles.module.css';

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
                    <Home />
                </div>
            </>
        );
    }
}

export default (App);
