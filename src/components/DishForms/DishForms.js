import React, { Component } from 'react'

import DishForm from './DishForm/DishForm';
import classes from './DishForms.module.css'

import Aux from '../../hoc/Aux'

class DishForms extends Component {

    state = {
        // displayIndex: null,
        displayArr: [],
        toggle: this.props.displayIndex,
        loading: this.props.loading,
    }

    getDishesHandler = (setname) => {
        // send request find setname = setname
        // return the array objects
        // setstate oldDishes: array obj
    }

    setDisplayIndexHandler = (index) => {
        // [true, false, true]
        const newArr = [...this.state.displayArr]
        newArr[index] = !newArr[index]
        this.setState({ displayArr: newArr })
    }
    onDragStart = (e, id) => {
        console.log(id)
        e.dataTransfer.setData('id', id)
    }


    // synchronize the props.loading and state.
    componentDidUpdate(prevProps) {
        if (this.props.loading !== prevProps.loading) {
            this.setState({ loading: this.props.loading })
        }

        // 
        if (this.props.currentSetIndex !== prevProps.currentSetIndex) {
            this.setState({ displayArr: [] });
        }
    }
    // componentWillUpdate(nextProps) {
    //     if (nextProps.loading !== this.props.loading) {
    //         this.setState({ loading: nextProps.loading })
    //     }

    //     // 
    //     if (nextProps.currentSetIndex !== this.props.currentSetIndex) {
    //         this.setState({ displayArr: [] });
    //     }
    // }



    render() {


        let dishDisplay;
        if (this.props.currentSetIndex !== 0) {
            if (this.state.loading) {
                return <h1 className={classes.Loading}>Loading...</h1>
            } else {
                dishDisplay = this.props.currentDishesArr.map((dish, index) => {
                    return (
                        <div
                            className={classes.DishForms}
                            draggable 
                            onDragStart={(e) => this.onDragStart(e, dish.id)}
                            key={index}>
                            <h2 onClick={() => this.setDisplayIndexHandler(index)}>{dish.dishName} {this.state.displayArr[index] ? <i className="fas fa-angle-double-down"></i> : <i className="fas fa-angle-double-up"></i>}</h2>
                            <DishForm refresh={this.props.refresh} currentDishesArr={this.props.currentDishesArr[index]} displayIndex={this.state.displayArr[index]}></DishForm>
                        </div>
                    );

                })
            }

        } else {
            dishDisplay = <div className={classes.DishForms} ><DishForm displayIndex={true} /></div>
        }

        return (
            <Aux>
                {dishDisplay}
            </Aux>
            // <DishForm dishArr={null}></DishForm>

        );
    }
}

export default DishForms;