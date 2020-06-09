import React, { Component } from 'react';
import axios from 'axios';
import classes from './DishForm.module.css'

require('dotenv').config()

// const URL = "http://localhost:3001"
const URL = "https://imenu-server.herokuapp.com"
const REDIRECT_URL = "https://imenubyjim.netlify.app"

class Dishform extends Component {
    state = {
        id: this.props.currentDishesArr === undefined ? '' : this.props.currentDishesArr._id,
        setName: this.props.currentDishesArr === undefined ? '' : this.props.currentDishesArr.setName,
        index: this.props.currentDishesArr === undefined ? '' : this.props.currentDishesArr.index,
        type: this.props.currentDishesArr === undefined ? '' : this.props.currentDishesArr.type,
        dishName: this.props.currentDishesArr === undefined ? '' : this.props.currentDishesArr.dishName,
        ingredient: this.props.currentDishesArr === undefined ? '' : this.props.currentDishesArr.ingredient,
    }

    componentDidUpdate(nextProps) {
        // check if the props equals to the next props
        if (this.props.currentDishesArr !== undefined) {
            if (nextProps.currentDishesArr.id === this.state.id) {
                return
            } else {
                this.setState({
                    id: nextProps.currentDishesArr.id,
                    setName: nextProps.currentDishesArr.setName,
                    index: nextProps.currentDishesArr.index,
                    type: nextProps.currentDishesArr.type,
                    dishName: nextProps.currentDishesArr.dishName,
                    ingredient: nextProps.currentDishesArr.ingredient,
                });
            }
        }

    }

    submitHandler = (event) => {
        event.preventDefault();
        const dishObj = { ...this.state }
        if (this.props.currentDishesArr === undefined) {
            console.log(dishObj)
            this.sendAddNewFetch(dishObj)
        } else {
            console.log(dishObj)
            this.sendUpdateFetch(dishObj)
        }


    }

    sendAddNewFetch = (obj) => {
        console.log("add new")

        axios({
            method: 'post',
            url: URL + '/addnewdish',
            data: obj
        })
            .then((response) => {
                window.location.href =  REDIRECT_URL
            });
    }

    sendUpdateFetch = (obj) => {

        axios({
            method: 'post',
            url: URL + '/updatedish',
            data: obj
        })
            .then((response) => {
                window.location.href = REDIRECT_URL
            });
    }

    sendDeleteFetch = (obj) => {

        axios({
            method: 'post',
            url: URL + '/deletedish',
            data: obj
        })
            .then((response) => {
                window.location.href = REDIRECT_URL
            });
    }

    inputChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    render() {

        return (
            <div className={classes.DishForm}  style={{ display: this.props.displayIndex ? "block" : "none" }}>
                <form onSubmit={this.submitHandler}>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label htmlFor="setName">Set name: </label>
                            <input className="form-control" onChange={this.inputChangeHandler} name="setName" ref="setName" type="text" required value={this.state.setName}></input>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="index">Index: </label>
                            <input className="form-control" onChange={this.inputChangeHandler} name="index" ref="index" type="text" required value={this.state.index}></input>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="type">Type: </label>
                            <input className="form-control" onChange={this.inputChangeHandler} name="type" ref="type" type="text" required value={this.state.type}></input>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="dishName">Dish name: </label>
                            <input className="form-control" onChange={this.inputChangeHandler} name="dishName" ref="dishName" type="text" required value={this.state.dishName}></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ingredient">Ingredient: </label>
                        <textarea className="form-control" onChange={this.inputChangeHandler} name="ingredient" ref="ingredient" type="text" required value={this.state.ingredient}></textarea>
                    </div>
                    <input
                        className="btn btn-primary"
                        type="submit"
                        // style={{ display: this.props.displayIndex ? "block" : "none" }}
                         />
                </form>
                <div className="btn-group ml-3">
                    
                    <button
                        className="btn btn-danger"
                        type="button"
                        // style={{ display: this.props.displayIndex ? "block" : "none" }}
                        onClick={() => { this.sendDeleteFetch(this.state) }}>Delete</button>
                </div>
            </div>

        );
    }
}

export default Dishform;