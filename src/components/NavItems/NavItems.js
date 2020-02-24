import React from 'react'

import NavItem from './NavItem/NavItem'
import classes from './NavItems.module.css'

const navItems = (props) => {
    const NavItemList = props.navItemList.map((el, index) => {
        return <NavItem clicked={() => props.clicked(index + 1)} key={index + 1}>{el}</NavItem>
    })
    NavItemList.unshift(<NavItem clicked={() => props.clicked(0)} key={0}>Add New</NavItem>)
    return (
        <ul className={classes.NavItems}>
            {NavItemList}
        </ul>
    );
}
    
export default navItems;