import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function ProtectedRoute(props) {

    const navigate = useNavigate() 

    useEffect(() => {
        
        if(!props.isAuth) {
            navigate('/')
        }
    })

    return props.children

}

const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuthenticated 
    }
}

export default connect(mapStateToProps)(ProtectedRoute)