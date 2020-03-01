import React, { Component } from 'react'

import axios from 'axios';
import Top from '../Top/Top'
import Results from '../Results/Results';

import classes from './UserLayout.module.css';

// const LOCAL_SERVERURL = "http://localhost:3001"
const NET_SERVER_URL = "https://imenu-server.herokuapp.com"


class UserLayout extends Component {
    state = {
        allSets: [],
        allDishes: [],
        chosenSet: '',
        danger: '',
        warning: '',
        dangerSets: '',
        warningSets: '',
        ready: false,
        searchDone: false,
    }

    clearAll = () => {
        this.state.allDishes.map(el => {
            el.status = 'safe'
            return true;
        })
        this.setState({
            chosenSet: '',
            danger: '',
            warning: '',
            dangerSets: '',
            warningSets: '',
            ready: false,
        })
    }
    

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    findAllDishes = () => {
        axios({
            method: 'get',
            url: NET_SERVER_URL + '/findalldishes',
        })
            .then((response) => {
                const data = response.data
                this.setState({ allDishes: data })
            })
            .then(() => this.setState({ searchDone: true }))
    }

    componentDidMount = () => {
        this.findallSets()
        this.findAllDishes()
    }

    findallSets = () => {
        axios({
            method: 'get',
            url: NET_SERVER_URL + '/findallsets',
        })
            .then((response) => {
                const data = response.data
                this.setState({ allSets: data })
            });
    }

    sendFetch = (set, ingredient, type) => {
        axios({
            method: 'post',
            url: NET_SERVER_URL + '/filterdishes',
            data: {
                set: set,
                ingredient: ingredient,
                type: type
            }
        })
            .then((response) => {
                const data = response.data
                const key = data[0];
                data.shift();
                this.setState({ [key]: data })
            })
            .then(() => {
                this.verifyStatus(this.state.allDishes, this.state.warningSets, "warning")
                this.verifyStatus(this.state.allDishes, this.state.dangerSets, "danger")
            })
            .then(() => {
                this.setState({ ready: true })
            })
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.danger !== '') {
            this.sendFetch(this.state.chosenSet, this.state.danger, 'danger')
        }
        if (this.state.warning !== '') {
            this.sendFetch(this.state.chosenSet, this.state.warning, 'warning')
        }
    }

    verifyStatus = (input, filter, type) => {
       
        input.map(el => {
            for (let i = 0; i < filter.length; i++) {
                if (el._id === filter[i]._id) {
                    el.status = type
                    break;
                } else if (el.status === "warning") {
                    el.status = "warning"
                } else {
                    el.status = "safe"
                }
            }
            return true;
        })

    }



    render() {


        const sortedArr = new Array(this.state.allSets.length)
        for (let i = 0; i < this.state.allSets.length; i++) {
            sortedArr[i] = []
        }

        for (let i = 0; i < this.state.allDishes.length; i++) {
            for (let j = 0; j < this.state.allSets.length; j++) {
                if (this.state.allDishes[i].setName === this.state.allSets[j]) {
                    sortedArr[j].push(this.state.allDishes[i])
                }
            }
        }

        let finalResult = '';
        if (this.state.ready) {
            finalResult = this.state.allSets.map((set, index) => {
                return <Results key={index} set={set} dish={sortedArr[index]}></Results>
            })
        }


        return (
            <div>
                <div className={classes.UserLayout}>
                    <Top />
                    <form onSubmit={this.submitHandler}>
                        <div className="form-group">
                            <label htmlFor="set">Chosen set:</label>
                            <input onChange={this.onChangeHandler} value={this.state.set} className="form-control" name="set" ref="set"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="danger">I can't eat:</label>
                            <br /><small>Please separate with comma or space</small>
                            <input onChange={this.onChangeHandler} value={this.state.danger} className="form-control" name="danger" ref="danger"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="warning">I dont't eat:</label>
                            <br /><small>Please separate with comma or space</small>
                            <input onChange={this.onChangeHandler} value={this.state.warning} className="form-control" name="warning" ref="warning"></input>
                        </div>
                        <small>Need to clear before a new search</small>
                        <br/><input disabled={this.state.searchDone && (this.state.dangerSets.length !== 0 || this.state.warningSets.length !==0)} className="btn btn-primary" type="submit"></input>
                        

                    </form>
                    <button onClick={this.clearAll} className="btn btn-warning mt-2">Clear</button>
                    
                </div>
                <div className={classes.Results}>
                    {finalResult}
                </div>

            </div>

        )
    }
}

export default UserLayout;