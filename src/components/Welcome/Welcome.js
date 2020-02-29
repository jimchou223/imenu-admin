import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Logout from '../Auth/Logout';

import classes from './Welcome.module.css'
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from './helpers';

export default withAuth(class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { userinfo: null, ready: false };
        this.checkAuthentication = checkAuthentication.bind(this);
    }
    async componentDidMount() {
        await this.checkAuthentication();
        this.applyClaims();
    }

    async componentDidUpdate() {
        await this.checkAuthentication();
        this.applyClaims();
    }

    async applyClaims() {
        if (this.state.userinfo && !this.state.claims) {
            const claims = Object.entries(this.state.userinfo);
            this.setState({ claims, ready: true });
        }
    }
    render() {
        let display = 'none'
        let username = ''
        let displayAdmin = 'none';
        if (this.state.ready) {
            if (this.state.ready && this.state.claims[5][1] === "Chef") {
                username = 'Chef'
                display = "flex"
                displayAdmin = "flex"
            } else if (this.state.ready && this.state.claims[5][1] !== "Chef") {
                username = ''
                display = "flex";
                displayAdmin = "none"
            }
        }

        return (
            <div className={classes.Welcome}>
                <div className={classes.Header}>
                    <h1>Welcome {username} </h1>
                </div>

                <div className={classes.Wrapper}>
                    <div className={classes.UserButton} style={{ display: display }}>
                        <Link to='/user'>User</Link>
                    </div>

                    <div className={classes.AdminButton} style={{ display: displayAdmin }}>
                        <Link to='/admin'>Admin</Link>
                    </div>

                    <div className={classes.LogoutButton} style={{ display: display}}>
                        <Logout ></Logout>
                    </div>

                </div>
            </div>
        )
    }
})


// export default function Welcome(props) {
//     return (
//         <div className={classes.Welcome}>
//             <div className={classes.Header}>
//                 <h1>Welcome Chef !!!</h1>
//             </div>

//             <div className={classes.Wrapper}>
//                 <div className={classes.UserButton}>
//                     <Link to='/user'>User</Link>
//                 </div>
//                 <div className={classes.AdminButton}>
//                     <Link to='/admin'>Admin</Link>
//                 </div>
//                 <div className={classes.LogoutButton}>
//                     <Logout ></Logout>
//                 </div>

//             </div>



//         </div>
//     )
// }
