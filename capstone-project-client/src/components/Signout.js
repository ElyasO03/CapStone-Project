import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Signout(props) {

    const navigate = useNavigate()

    useEffect(() => {
        
        localStorage.removeItem('jwt')
        localStorage.removeItem('email')
        localStorage.removeItem('Role')
        localStorage.removeItem('user')
        props.onSignout() 

        navigate('/login')
    })

    return (
        <></>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignout: () => dispatch({type: 'ON_SIGNOUT'})
    }
}

export default connect(null, mapDispatchToProps)(Signout)