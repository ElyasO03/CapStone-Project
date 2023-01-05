import React from 'react'
import { NavLink } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
    <div>
        <h1>HomePage</h1>
        <NavLink to = "/easyquiz" ><h3>Easy Quiz</h3></NavLink>
        <NavLink to = "/mediumquiz" ><h3>Medium Quiz</h3></NavLink>
        <NavLink to = "/hardquiz" ><h3>Hard Quiz</h3></NavLink>
    </div>
    </>
  )
}

export default HomePage