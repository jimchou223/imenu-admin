import React from 'react'
// import classes from './NavItem.module.css'

const navItem = (props) => {
    return(
        <li onClick={props.clicked}>{props.children}</li>
    );
}

export default navItem;