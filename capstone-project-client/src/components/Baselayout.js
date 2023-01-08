import Header from './Header'
// import { NavLink } from "react-router-dom";
// import {connect} from 'react-redux'
import '../style/header.css';
import '../style/baselayout.css';
import Offcanvas from './Offcanvas';
import Offcanvas2 from './Offcanvas2';




  


function Baselayout (props) {
    return (
        <div className='baselayout'>
            {/* <Offcanvas /> */}
            <Offcanvas2 />
            {/* <Header /> */}
            {props.children}
            <div className='triangle2'></div>
            <h6 className='copyright'>Copyright 2022 </h6>
        </div>

      
    )
}

export default Baselayout