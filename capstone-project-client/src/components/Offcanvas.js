import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from "react-router-dom";
import '../style/header.css';
import {connect} from 'react-redux'

function ResponsiveExample(props) {

  const role = localStorage.getItem('Role')
  const user = localStorage.getItem ('user')
  const id = localStorage.getItem('id')

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" className="d-lg-none" onClick={handleShow}>
        Launch
      </Button>

      <Alert variant="info" className="d-none d-lg-block">
        Resize your browser to show the responsive offcanvas toggle.
      </Alert>

      <Offcanvas show={show} onHide={handleClose} responsive="lg">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className= "navs">

             { props.isAuth ? <h4> Welcome, {user} Status: {role}</h4>: null  }
            <NavLink to = "/" ><h3>Home</h3></NavLink>
            <NavLink to = "/quiz" ><h3>Student</h3></NavLink>
            { props.role === 'teacher' ? <NavLink to = {`/teacher-post/${id}`} ><h3>Teacher</h3></NavLink>: null  }
            {props.isAuth ? null:<NavLink to = "/login" ><h3>Login</h3></NavLink>}
            {props.isAuth ?null:<NavLink to = "/register" ><h3>Registration</h3></NavLink>}
            {props.isAuth ?<NavLink to = "/signout" ><h3>Logout</h3></NavLink>:null}
            
   
        </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

const mapStateToProps =(state) =>{
    return {
        isAuth: state.isAuthenticated,
        role: state.role,
        username: state.username
    }
}
export default connect(mapStateToProps) (ResponsiveExample)