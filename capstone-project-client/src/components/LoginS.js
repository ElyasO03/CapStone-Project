import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux'

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

                        navigate(`/${id}`)
                    } else {
                        alert('The email or password or Role is incorrect. Please try again')
                    }
                })
        }
    }


    return (
        <>
        <h2>Login</h2>
        <input onChange={handleOnChange} name="email" type='text' required="required" />
        <span>Email</span>
        <i></i>
        <input onChange={handleOnChange} name="password" type='password' required="required" />
        <span>Password</span>
        <i></i>
        <input onChange={handleOnChange} name="Role" type='text' required="required" />
        <span>Role</span>
        <i></i>
        <button onClick={handleSubmit}>Login</button>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (token) => dispatch({type: 'ON_LOGIN', payload: token}),
        onRole:(Role) => dispatch({type: 'ON_ROLE',  payload:Role})

    }
}

export default connect(null, mapDispatchToProps)(LoginS)