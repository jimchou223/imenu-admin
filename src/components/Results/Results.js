import React from 'react'

import Result from './Result/Result'
import classes from './Results.module.css'

const results = (props) => {

    return (
        <div className={classes.Results}>
            <h2>{props.set}</h2>
            <Result className={classes.Result} dish={props.dish} ></Result>
        </div>

    )


}





export default results
