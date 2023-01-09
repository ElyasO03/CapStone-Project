import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux'
import '../style/LoginS.css'

function LoginS(props) {

    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        if (!user.email || !user.password || !user.Role) {
            alert('Please fill out all textboxes.')
        } else {
            fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(response => response.json())
                .then(result => {

                    if (result.success) {
                        const token = result.token
                        const email = result.email
                        const Role = result.Role
                        const username = result.username
                        const id = result.id
                        localStorage.setItem('jwt', token)
                        localStorage.setItem('email', email)
                        localStorage.setItem('Role', Role)
                        localStorage.setItem('user', username)
                        localStorage.setItem('id', id)

                        props.onLogin(token)
                        props.onRole(Role)

                        navigate(`/`)
                    } else {
                        alert('The email or password or Role is incorrect. Please try again')
                    }
                })
        }
    }


    return (
        <>
            <div className='body'>
                <div className='box'>
                    <div className='form'>
                        <h2>Login</h2>
                        <div className='inputBox'>
                            <input minLength={4} maxLength={30} onChange={handleOnChange} name="email" type="text" required="required" />
                            <span>Email</span>
                            <i></i>
                        </div>
                        <div className='inputBox'>
                            <input minLength={4} maxLength={16} onChange={handleOnChange} name="password" type="password" required="required" />
                            <span>Password</span>
                            <i></i>
                        </div>
                        <div className='inputBox'>
                            <input minLength={4} maxLength={8} onChange={handleOnChange} name="Role" type="text" required="required" />
                            <span>Role</span>
                            <i></i>
                        </div>
                        <div className='links'>
                            <a href='/register'>Sign Up</a>
                        </div>
                        <button onClick={handleSubmit}>Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (token) => dispatch({ type: 'ON_LOGIN', payload: token }),
        onRole: (Role) => dispatch({ type: 'ON_ROLE', payload: Role })

    }
}

export default connect(null, mapDispatchToProps)(LoginS)