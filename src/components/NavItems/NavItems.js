import React, { Component } from 'react'

import NavItem from './NavItem/NavItem'
import classes from './NavItems.module.css'

import axios from 'axios'

// const LOCAL_SERVERURL = "http://localhost:3001"
const NET_SERVER_URL = "https://imenu-server.herokuapp.com"
const NET_WEBPAGE_URL = "https://imenubyjim.netlify.app/admin"

class NavItems extends Component {
    onDragOver = (e) => {
        e.preventDefault()
    }
    onDrop = (e) => {
        const id = e.dataTransfer.getData("id")
        var myRe = new RegExp('>(.*)<');
        var myReArr = myRe.exec(e.currentTarget.innerHTML);
        const newSetName = myReArr[1]
        this.findDish(id, newSetName)

    }
    findDish = (id, newSetName) => {
        axios({
            method: 'post',
            url: NET_SERVER_URL + '/findbyid',
            data: {
                id: id
            }
        })
            .then((response) => {
                const data = response.data
                data[0].setName = newSetName
                this.updateDish(data[0])
            })
            .then(() => window.location.href = NET_WEBPAGE_URL)
    }

    updateDish = (dishObj) => {
        axios({
            method: 'post',
            url: NET_SERVER_URL + '/updatedish',
            data: {
                id: dishObj.id,
                setName: dishObj.setName,
                index: dishObj.index,
                type: dishObj.type,
                dishName: dishObj.dishName,
                ingredient: dishObj.ingredient
            }
        })
            .then((response) => {
                console.log("update done")
            });

    }

    render() {
        const NavItemList = this.props.navItemList.map((el, index) => {
            return (
                <div
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => this.onDrop(e, "complete")}
                    key={index + 1}>

                    <NavItem
                        clicked={() => this.props.clicked(index + 1)}
                        key={index + 1}

                        active={index + 1 === this.props.currentSetIndex}>{el}
                    </NavItem>
                </div>)

        })
        NavItemList.unshift(<NavItem
            clicked={() => this.props.clicked(0)}
            key={0}
            active={this.props.currentSetIndex === 0}>Add New</NavItem>)

        return (
            <ul className={classes.NavItems}>
                {NavItemList}
            </ul>
        );

    }
}

export default NavItems;