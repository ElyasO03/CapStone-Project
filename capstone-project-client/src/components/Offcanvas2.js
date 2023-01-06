import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from "react-router-dom";
import '../style/header.css';
import {connect} from 'react-redux'
import { RiLogoutCircleRLine } from 'react-icons/ri';
import {SiNintendogamecube} from 'react-icons/si'

const options = [
    {
      name: 'Enable backdrop (default)',
      scroll: false,
      backdrop: true,
    },
    {
      name: 'Disable backdrop',
      scroll: false,
      backdrop: false,
    },
    {
      name: 'Enable body scrolling',
      scroll: true,
      backdrop: false,
    },
    {
      name: 'Enable both scrolling & backdrop',
      scroll: true,
      backdrop: true,
    },
  ];
  
  function OffCanvasExample({ name, ...props }) {
    
  const role = localStorage.getItem('Role')
  const user = localStorage.getItem ('user')
  const id = localStorage.getItem('id')
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
  
    return (
    <>
        <div className='navbar'>
                 
            <Button variant="primary" onClick={toggleShow}>
            {name}Menu
            </Button>
            <NavLink to = "/quiz" style={{ textDecoration: 'none' }}><h2 className='name'><SiNintendogamecube size={30}/>CoderTrivia</h2></NavLink>
            { props.isAuth ? <div className='welcome'><h6> Welcome, {user}</h6> <h6>Status: {role}</h6></div>: null  }
            
        </div>
        <div className='offcanvas'>
        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title ><h4 className='triviaMenu'><SiNintendogamecube />CoderTrivia </h4></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
          <div className= "navs">
                { props.isAuth ? <div><h5> Welcome, {user}</h5> <h5>Status: {role}</h5></div>: null  }
                <button className='navButton'><NavLink to = "/:id" style={{ textDecoration: 'none' }}><h3 className='links'>Home</h3></NavLink></button>
                <button className='navButton'><NavLink to = "/quiz" style={{ textDecoration: 'none' }}><h3 className='links'>Student</h3></NavLink></button>
                { props.role === 'teacher' ? <NavLink to = {`/teacher-post/${id}`} style={{ textDecoration: 'none' }}><h3>Teacher</h3></NavLink>: null  }
                {props.isAuth ? null:<NavLink to = "/login" style={{ textDecoration: 'none' }}><h3>Login</h3></NavLink>}
                {props.isAuth ?null:<NavLink to = "/register" style={{ textDecoration: 'none' }}><h3>Registration</h3></NavLink>}
                {props.isAuth ?<div className='signoutContainer'><NavLink to = "/signout" style={{ textDecoration: 'none' }}><h3 className='logoutSign'><RiLogoutCircleRLine style={{ color: 'f44336', font:'bolder'}} size={50}/></h3></NavLink></div>:null}
            </div>
          </Offcanvas.Body>
        </Offcanvas>
        </div>
      
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
export default connect(mapStateToProps) (OffCanvasExample)