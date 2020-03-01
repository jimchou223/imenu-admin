import React, { Component } from 'react'
import axios from 'axios';
import classes from './UploadFile.module.css'
const uuidv4 = require('uuid/v4')

// const LOCAL_SERVERURL = "http://localhost:3001"
const NET_SERVER_URL = "https://imenu-server.herokuapp.com"


class UploadFile extends Component {
    state = {
        uploadDishes: []
    }

    changeHandler = async (e) => {
        const resultArr = []
        const reader = new FileReader();
        let resultJsonArr = []
        reader.onload = function (e) {
            let resultString = ''
            //parse string to array

            resultString = (e.target.result).split('\r\n')

            resultString.forEach(element => {
                resultArr.push(element.split(','))
            });

            const titleArr = resultArr.shift()
            console.log(titleArr)

            // let resultJsonArr = []
            for (let i = 0; i < resultArr.length; i++) {
                let dishJSON = {}
                for (let j = 0; j < titleArr.length; j++) {
                    dishJSON[titleArr[j]] = resultArr[i][j]
                    console.log(titleArr[j])
                }
                dishJSON['id'] = uuidv4()
                resultJsonArr.push(dishJSON)
            }
            console.log(resultJsonArr)

        };
        reader.readAsText(e.target.files[0]);
        console.log(resultJsonArr)
        this.setState({ uploadDishes: resultJsonArr })


    }
    submitHandler = (e) => {
        e.preventDefault()
        console.log('send')
        const dishArr = this.state.uploadDishes
        axios({
            method: 'post',
            url: NET_SERVER_URL + '/addnewdishes',
            data: {
                dishArr: dishArr
            }
        })
            .then((response) => {
                console.log(response)

            })
            .then(window.location.href = "http://localhost:3000/admin");




    }
    render() {
        return (
            <div className={classes.UploadFile}>


                {/* <span id="special" className="btn btn-secondary">Choose a file...</span> */}
                <input
                    className="btn btn-secondary"
                    type="file"
                    id="file"
                    name="file"
                    onChange={this.changeHandler} />
                <span className="btn btn-dark" onClick={this.submitHandler}>Upload</span>


            </div >

        )
    }

}
export default UploadFile;