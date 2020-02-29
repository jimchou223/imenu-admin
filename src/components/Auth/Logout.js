import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

const issuer = 'https://dev-421319.okta.com/oauth2/default';
const redirectUri = `${window.location.origin}`;



// Basic component with logout button
class Logout extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    async logout() {
        // Read idToken before local session is cleared
        const idToken = await this.props.auth.getIdToken();

        // Clear local session
        await this.props.auth.logout('/');

        // Clear remote session
        window.location.href = `${issuer}/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${redirectUri}`;
    }

    render() {
        return (
            <button onClick={this.logout}>Logout</button>
        );
    }
};



// withAuth() makes Okta "Auth" object available as "this.props.auth"
Logout = withAuth(Logout);


export default Logout