import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { Checkbox } from 'react-input-checkbox'



function Teacher() {  
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const [teacher, setTeachers] = useState([])
 

   
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        }, [])
    }
    

    





    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8080/teacher-question-post/${id}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(result => {
            if(result.error) {
                console.log(result.error)
            } else {
                setTeachers(result)
            }   
        })
    }
    return (
        <div >
            <h1>Choose a teacher </h1> 
            <form  onSubmit={handleSubmit}>
                <label htmlFor="question"> 1. Create your question</label>
                <br/>
                <input id ="question"className='input' onChange = {handleChange} name = "question" type = "text" placeholder = "Create a question"  />
                {/* <input className='input' onChange = {handleChange} name = "level" type = "text" placeholder = "What's a level of difficulty"  /> */}
                <select onChange = {handleChange} name = "level">
                    <option value="Easy">Easy</option>
                    <option value ="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                <button >Choose</button>
            </form> 
        </div>
    )
   
}

export default TeacherPost


