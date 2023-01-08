import React from 'react'
import { NavLink } from 'react-router-dom'
import "../style/QuizE.css"
import {connect} from 'react-redux';


const HomePage = (props) => {
  return (
    <div className='mainContainer'>
      <div className='question-card'>
        <ul>
          <h1 className='homepaget'>Please Choice your level:</h1>
          <NavLink to="/easyquiz" style={{ textDecoration: 'none' }}><li>Easy Quiz</li></NavLink>
          <NavLink to="/mediumquiz" style={{ textDecoration: 'none' }}><li>Medium Quiz</li></NavLink>
          <NavLink to="/hardquiz"style={{ textDecoration: 'none' }} ><li>Hard Quiz</li></NavLink>
        </ul>
      </div>
    </div>
  )
}
const mapStateToProps =(state) =>{
  return {
     
      isAuth: state.isAuthenticated,
      role: state.role,
      username: state.username
      
  }
}


export default connect (mapStateToProps)(HomePage)
