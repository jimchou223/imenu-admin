import React from 'react'
// import classes from './NavItem.module.css'

const navItem = (props) => {
    return(
        <li style={{backgroundColor: props.active? "#235789" : "#161925"}} onClick={props.clicked}>{props.children}</li>
    );
}

export default navItem;