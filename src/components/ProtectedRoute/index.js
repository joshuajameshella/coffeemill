import React from "react";
import { Redirect } from 'react-router-dom';

// --- Protected Route ---
// If the user has a JWT token in their Local Storage, allow access to the protected route.
// This is not a perfect solution - someone could manually set a random token in the browser.
// However, none of the admin API requests would work without the correct token.

// ProtectedRoute is the security protecting specific components from being accessed
class ProtectedRoute extends React.Component {
    render() {
        const Component = this.props.component;
        const authToken = localStorage.getItem('JWT_token');

        return authToken ? <Component /> : <Redirect to={{ pathname: '/login' }} />
    }
}

export default ProtectedRoute;
