import React from 'react'
import { NavLink } from 'react-router-dom'
import "../style/QuizE.css"

const HomePage = () => {
  return (
    <>
      <div className='question-card'>
        <ul>
          <h1 className='homepaget'>Please Choice your level:</h1>
          <NavLink to="/easyquiz" ><li>Easy Quiz</li></NavLink>
          <NavLink to="/mediumquiz" ><li>Medium Quiz</li></NavLink>
          <NavLink to="/hardquiz" ><li>Hard Quiz</li></NavLink>
        </ul>
      </div>
    </>
  )
}

export default HomePage