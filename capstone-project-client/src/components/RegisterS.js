import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { connect } from 'react-redux'
import '../style/RegisterS.css'


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
    <div className='body'>
        <div className='box'>
            <div className='form'>
        <h2>Register</h2>
        <div className='inputBox'>
        <input minLength={4} maxLength={16} onChange={handleChange} type='text' name='username' />
        <span>Enter A Username</span>
        <i></i>
        </div>
        <div className='inputBox'>
        <input minLength={4} maxLength={30} onChange={handleChange} type='text' name='email' />
        <span>Enter Email</span>
        <i></i>
        </div>
        <div className='inputBox'>
        <input minLength={4} maxLength={16} onChange={handleChange} type='password' name='password' />
        <span>Password</span>
        <i></i>
        </div>
        <div className='inputBox'>
        <input minLength={4} maxLength={8} onChange={handleChange} type='text' name='Role' />
        <span>Role</span>
        <i></i>
        </div>
        <div className='links'>
            <a href='/login'>Login</a>
        </div>
        <button onClick={handleSubmit} >Register</button>
        </div>
        </div>
     </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReg: (username) => dispatch({type: 'ON_REG', payload: username}),
        
        
    }
}


export default connect(null, mapDispatchToProps)(RegisterS)