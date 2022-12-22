import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { connect } from 'react-redux'


function RegisterS(props) {

    const navigate = useNavigate()
    const [user, setUser] = useState([])

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        if (!user.username || !user.email || !user.password || !user.Role) {
            alert('Please fill out all textboxes')
        } else {
            fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    Role: user.Role
                })
            }).then(response => response.json())
                .then(result => {
                    if (result.error) {
                        return
                    } else {
                        navigate('/login')
                    }
                })
        }
    }

    return (
        <>
        <h2>Register</h2>
        <input onChange={handleChange} minLength={4} maxLength={16} type='text' name='username' />
        <span>Username</span>
        <i></i>
        <input onChange={handleChange} type='text' name='email' />
        <span>Email</span>
        <i></i>
        <input onChange={handleChange} minLength={4} maxLength={16} type='password' name='password' />
        <span>Password</span>
        <i></i>
        <input onChange={handleChange} type='text' name='Role' />
        <span>Role</span>
        <i></i>
        <button onClick={handleSubmit}>Register</button>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReg: (username) => dispatch({type: 'ON_REG', payload: username}),
        
        
    }
}


export default connect(null, mapDispatchToProps)(RegisterS)
