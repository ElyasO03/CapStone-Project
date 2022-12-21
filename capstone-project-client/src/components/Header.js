import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import '../style/header.css';

function Header () {
   

    return (
        <div className= "navs">
          
            <NavLink to = "/" ><h3>Home</h3></NavLink>
            <NavLink to = "/" ><h3>Student</h3></NavLink>
            <NavLink to = "/teacher-post" ><h3>Teacher</h3></NavLink>
            <NavLink to = "/login" ><h3>Login</h3></NavLink>
            <NavLink to = "/register" ><h3>Registration</h3></NavLink>
            
   
        </div>
    )
}


export default Header

