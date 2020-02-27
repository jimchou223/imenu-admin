import React, { Component } from 'react'
import Top from '../Top/Top'
import NavItems from '../NavItems/NavItems';
import Dishforms from '../DishForms/DishForms'
import axios from 'axios'

import classes from './AdminLayout.module.css'


// const URL = "http://localhost:3001"
const URL = "https://imenu-server.herokuapp.com"



class Layout extends Component {

    state = {
        setsList: [],
        currentSetIndex: '',
        currentDishIndex: null,
        currentDishesArr: [],
        currentDishArr: [],
        lodaing: false,
    }

    navClickedHandler = (index) => {
        this.setState({ currentSetIndex: index })
        console.log(index)
        this.getCurrentDishesArr(this.state.setsList[index - 1])
        // getCurrentDishesArr
    }

    getAllSetsHandler = () => {
        this.setState({ loading: true })
        axios({
            method: 'get',
            url: URL + '/findallsets',
        })
            .then((response) => {
                const data = response.data
                this.setState({ setsList: data, loading: false })
            });
    }

    getCurrentDishesArr = (setName) => {
        this.setState({loading: true})
        axios({
            method: 'post',
            url: URL + '/findDishes',
            data: {
                setName: setName
            }
        })
            .then((response) => {
                const data = response.data
                this.setState({ currentDishesArr: data, loading: false })
            });
    }
    componentDidMount = () => {
        this.getAllSetsHandler()
    }


    render() {

        return (
            <div className={classes.AdminLayout}>
                <Top />
                <NavItems 
                    className={classes.NavItems} 
                    clicked={(index) => this.navClickedHandler(index)} 
                    navItemList={this.state.setsList}
                    currentSetIndex={this.state.currentSetIndex}></NavItems>
                <Dishforms
                    className={classes.Dishforms}
                    currentDishArr={this.state.currentDishArr}
                    currentDishesArr={this.state.currentDishesArr}
                    currentSetIndex={this.state.currentSetIndex}
                    loading={this.state.loading} />
            </div>
        );
    }
}

export default Layout;

