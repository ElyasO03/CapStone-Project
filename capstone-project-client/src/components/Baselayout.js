import Header from './Header'
import { NavLink } from "react-router-dom";
import {connect} from 'react-redux'
import '../style/header.css';



  


function Baselayout (props) {
    return (
        <div >
            <Header />
            {props.children}
            <h6 >Copyright 2022 </h6>
        </div>

      
    )
}

export default Baselayout