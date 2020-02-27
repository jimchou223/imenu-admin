import React from 'react'

import Result from './Result/Result'

const results = (props) => {

    return (
        <div>
            <h2>{props.set}</h2>
            <Result dish={props.dish} ></Result>
        </div>

    )


}





export default results
