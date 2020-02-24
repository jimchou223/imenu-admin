import React from 'react'
import { Link } from 'react-router-dom';


export default function Home() {
    return (
        <div>
            <Link to="/welcome">Click to login</Link>
        </div>
    )
}
