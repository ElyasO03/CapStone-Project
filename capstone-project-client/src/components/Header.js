import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import '../style/header.css';

function Header (props) {
    const role = localStorage.getItem('Role')
    const user = localStorage.getItem ('user')
    const id = localStorage.getItem('id')


    return (
        
        <div className= "navs">

             { props.isAuth ? <h4> Welcome, {user} Status: {role}</h4>: null  }
            <NavLink to = "/" ><h3>Home</h3></NavLink>
            <NavLink to = "/home" ><h3>Home</h3></NavLink>
            <NavLink to = "/quiz" ><h3>Student</h3></NavLink>
            { props.role === 'teacher' ? <NavLink to = {`/teacher-post/${id}`} ><h3>Teacher</h3></NavLink>: null  }
            {props.isAuth ? null:<NavLink to = "/login" ><h3>Login</h3></NavLink>}
            {props.isAuth ?null:<NavLink to = "/register" ><h3>Registration</h3></NavLink>}
            {props.isAuth ?<NavLink to = "/signout" ><h3>Logout</h3></NavLink>:null}
            
   
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


export default connect (mapStateToProps)(Header)

