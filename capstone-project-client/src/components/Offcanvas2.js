import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from "react-router-dom";
import '../style/header.css';
import {connect} from 'react-redux'
import { RiLogoutCircleRLine } from 'react-icons/ri';
import {SiNintendogamecube} from 'react-icons/si';
import {CgMenuOreos} from 'react-icons/cg'
import {TiThMenu} from 'react-icons/ti'


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
            <button className = 'navToggleButton' onClick={toggleShow}>
                {name}<TiThMenu  size={55}/>
                </button>
                <div className='nameContainer'> <NavLink to = "/" style={{ textDecoration: 'none' }}><h2 className='name'><SiNintendogamecube size={55}/>CoderTrivia</h2></NavLink></div>
                { props.isAuth ? <div className='welcome'><h6 className='userNav'> User: {user}</h6> <h6 className='statusNav'>Status: {role}</h6></div>: null  }     
                {/* <div className='triangle'>
              </div> */}
            </div>
             <div className='triangle'>
              </div>
        
        
        <div className='offcanvas'>
        <Offcanvas style={{ color: '#a9d6e5' }} show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title ><h4 className='triviaMenu'><SiNintendogamecube />CoderTrivia </h4></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
          <div className= "navs">
                { props.isAuth ? <div><h5 className='offUser'> Welcome, {user}</h5> <h5 className='offUser'>Status: {role}</h5></div>: null  }
                <button className='navButton'><NavLink to = "/" style={{ textDecoration: 'none' }}><h3 className='links'>Home</h3></NavLink></button>
                <button className='navButton'><NavLink to = "/quiz" style={{ textDecoration: 'none' }}><h3 className='links'>Big School</h3></NavLink></button>
                <button className='navButton'><NavLink to = "/student" style={{ textDecoration: 'none' }}><h3 className='links'>My Class</h3></NavLink></button>
                { props.role === 'teacher' ? <button className='navButton'><NavLink to = {`/teacher-post/${id}`} style={{ textDecoration: 'none' }}><h3 className='links'>Teacher</h3></NavLink></button>: null  }
                {props.isAuth ? null:<button className='navButton'><NavLink to = "/login" style={{ textDecoration: 'none' }}><h3 className='links'>Login</h3></NavLink></button>}
                {props.isAuth ?null:<button className='navButton'><NavLink to = "/register" style={{ textDecoration: 'none' }}><h3 className='links'>Registration</h3></NavLink></button>}
                {props.isAuth ?<div className='signoutContainer'><NavLink to = "/signout" style={{ textDecoration: 'none' }}><h3 className='logoutSign'><RiLogoutCircleRLine  size={65}/></h3></NavLink></div>:null}
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