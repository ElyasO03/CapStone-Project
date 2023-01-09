import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {NavLink} from "react-router-dom";
import '../style/teacherPost.css';
import TeacherCabinet from './TeacherCabinet';
import { BiArrowBack} from "react-icons/bi";
import { CgDisplayGrid} from "react-icons/cg"
import { MdOutlineCreate} from "react-icons/md"; 
import { TiDelete} from "react-icons/ti"
// import { Checkbox } from 'react-input-checkbox'



function TeacherPost() {  
    const [user, setUser] = useState({})
    const [display, setDisplay] =useState(false)
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
        <div className='majorContainer'>
            
            <div className='postContainer'>
             <h1 className='titleCreateQuiz'>Create your QUIZ</h1> 
                {/* <button > <NavLink to = {`/my-teacher-list/${id}`}  style={{ textDecoration: 'none' }}>My Questions</NavLink></button> */}
                
                
                <form  onSubmit={handleSubmit}>
                    <div className='formClass'>
                    <label className = 'label' htmlFor="question"> 1. Create your question</label>
                    
                    <input  id ="question"className='input' onChange = {handleChange} name = "question" type = "text" placeholder = "Create a question"  />
                    {/* <input className='input' onChange = {handleChange} name = "level" type = "text" placeholder = "What's a level of difficulty"  /> */}
                    <select className ='select' onChange = {handleChange} name = "level">
                        <option className ='select' value="Easy">Easy</option>
                        <option className ='select' value ="Medium">Medium</option>
                        <option className ='select' value="Hard">Hard</option>
                    </select>
                    <label className = 'label' htmlFor="choice"> 2. Create your choices</label>
                    
                    <input  id ="choice"className='input' onChange = {handleChange} name = "choice1" type = "text" placeholder = "1. Enter first choice"  />
                    <div className='TrueFalse'>
                        <div className='TrueCheck'>
                        <label className='trueAnswer' htmlFor="True">True</label>
                        <input  htmlFor="True"className='input' onChange = {handleChange} name = "choice1TrueFalse" type = "checkbox" value={true} placeholder = "True" /> 
                        </div>
                        <div className='TrueCheck'>
                        <label className='trueAnswer' htmlFor="False">False</label>
                        <input  id = "False" className='input' onChange = {handleChange} name = "choice1TrueFalse" type = "checkbox" value={false} />
                        </div>                   
                    </div>
                    
                    <input className='input' onChange = {handleChange} name = "choice2" type = "text" placeholder = "2. Enter second choice"  />
                    <div className='TrueFalse'>
                        <div className='TrueCheck'>
                        <label className='trueAnswer'  htmlFor="True">True</label>
                        <input  id = "True" className='input' onChange = {handleChange} name = "choice2TrueFalse" type = "checkbox" value={true}  />
                        </div> 
                        <div className='TrueCheck'>
                        <label className='trueAnswer' htmlFor="False">False</label>
                        <input  id = "False" className='input' onChange = {handleChange} name = "choice2TrueFalse" type = "checkbox" value={false}  />    
                        </div>
                    </div>
                    <input className='input' onChange = {handleChange} name = "choice3" type = "text" placeholder = "3. Enter thrid choice"  /> 
                    <div className='TrueFalse'>
                        <div className='TrueCheck'>
                        <label className='trueAnswer' htmlFor="True">True</label>
                        <input  id = "True" className='input' onChange = {handleChange} name = "choice3TrueFalse" type = "checkbox" value={true}  />
                        </div>
                        <div className='TrueCheck'>
                        <label className='trueAnswer' htmlFor="False">False</label>
                        <input  id = "False" className='input' onChange = {handleChange} name = "choice3TrueFalse" type = "checkbox" value={false}  />    
                        </div>
                    </div>
                    <input className='input' onChange = {handleChange} name = "choice4" type = "text" placeholder = "4. Enter forth choice "  />
                    <div className='TrueFalse'>
                        <div className='TrueCheck'>
                        <label className='trueAnswer' htmlFor="True">True</label>
                        <input  id = "True" className='input' onChange = {handleChange} name = "choice4TrueFalse" type = "checkbox" value={true}  />
                        </div>
                        <div className='TrueCheck'>
                        <label className='trueAnswer' htmlFor="False">False</label>
                        <input  id = "False" className='input' onChange = {handleChange} name = "choice4TrueFalse" type = "checkbox" value={false}  />       
                        </div>
                    </div>
                    <button className='create-quiz'><MdOutlineCreate size={30}/>Create a QUIZ</button>
                    </div>
                </form>
            </div> 
                <div className='display'>
                    <div className='Display-Back'>
                    <button className ='buttonDisplay' onClick = {() =>navigate(`/${id}`)}><BiArrowBack size ={21}/>Back to Menu</button>
                    <button className ='buttonDisplay' onClick={() =>setDisplay(!display)}> <CgDisplayGrid size ={25}/>Display </button>
                    

                    </div>
                
                    <div className='choicesDisplay' >
                    {display ? <TeacherCabinet />: <h1 className='pressDisplay'>Press Display to show created questions..</h1>}
                    </div>
                </div>
        </div>
        
            
       
    )
   
}

export default TeacherPost


