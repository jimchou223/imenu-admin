import React from 'react'

const result = (props) => {
    let icon = ''
    let color = {color : "black"}
    const dishes = props.dish.map((dish, index) => {
        if (dish.status === 'danger') {
            icon = <i className="fas fa-skull-crossbones"></i>
            color = {color: "red"}
        } else if (dish.status === 'warning') {
            icon = <i className="fas fa-exclamation-triangle"></i>
            color = {color: "orange"}
        } else {
            icon = ''
            color = {color: "black"}
        }
        return <p key={index} style={color}>{icon}{dish.dishName} {dish.type} {dish.ingredient}</p>
    })
    return (
        <div>
            {dishes}
        </div>
    )

}

export default result