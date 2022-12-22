import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { Checkbox } from 'react-input-checkbox'



function TeacherPost() {  
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const id = localStorage.getItem('id')

   
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        }, [])
    }
   
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8080/teacher-question-post/${id}`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({Questions: user.question, level: user.level, choice1:[user.choice1, user.choice1TrueFalse], choice2: [user.choice2, user.choice2TrueFalse], choice3: [user.choice3, user.choice3TrueFalse], choice4: [user.choice4, user.choice4TrueFalse] }) 
            
        }).then(response => response.json())
        .then(result => {
            // check the result if the book was added or not
            navigate('/teacher-post')      
        })
    }
    return (
        <div >
            <h1>Create your QUIZ</h1> 
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
                <br/>
                <label htmlFor="choice"> 2. Create your choices</label>
                <br/>
                <input id ="choice"className='input' onChange = {handleChange} name = "choice1" type = "text" placeholder = "Enter first choice"  />
                <label htmlFor="True">True</label>
                <input htmlFor="True"className='input' onChange = {handleChange} name = "choice1TrueFalse" type = "checkbox" value={true} placeholder = "True" /> 
                <label htmlFor="False">False</label>
                <input id = "False" className='input' onChange = {handleChange} name = "choice1TrueFalse" type = "checkbox" value={false} />
                <br />
                <input className='input' onChange = {handleChange} name = "choice2" type = "text" placeholder = "Enter second choice"  />
                <label htmlFor="True">True</label>
                <input id = "True" className='input' onChange = {handleChange} name = "choice2TrueFalse" type = "checkbox" value={true}  />
                <label htmlFor="False">True</label>
                <input id = "False" className='input' onChange = {handleChange} name = "choice2TrueFalse" type = "checkbox" value={false}  />    
                <br />
                <input className='input' onChange = {handleChange} name = "choice3" type = "text" placeholder = "Enter thrid choice"  /> 
                <label htmlFor="True">True</label>
                <input id = "True" className='input' onChange = {handleChange} name = "choice3TrueFalse" type = "checkbox" value={true}  />
                <label htmlFor="False">True</label>
                <input id = "False" className='input' onChange = {handleChange} name = "choice3TrueFalse" type = "checkbox" value={false}  />    
                <br />
                <input className='input' onChange = {handleChange} name = "choice4" type = "text" placeholder = "Enter forth choice "  />
                <label htmlFor="True">True</label>
                <input id = "True" className='input' onChange = {handleChange} name = "choice4TrueFalse" type = "checkbox" value={true}  />
                <label htmlFor="False">True</label>
                <input id = "False" className='input' onChange = {handleChange} name = "choice4TrueFalse" type = "checkbox" value={false}  />       
                <br/>
                <button >Create a QUIZ</button>
            </form> 
        </div>
    )
   
}

export default TeacherPost



