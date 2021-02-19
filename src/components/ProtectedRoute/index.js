import React from "react";
import { Redirect } from 'react-router-dom';
import { Login } from '../../credentials';

// ProtectedRoute is the security protecting specific components from being accessed
class ProtectedRoute extends React.Component {
    render() {

        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem('token');

        return isAuthenticated === Login.password ? (
          <Component />
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
}

export default ProtectedRoute;
