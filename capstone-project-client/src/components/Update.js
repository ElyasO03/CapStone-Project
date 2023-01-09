import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {NavLink} from "react-router-dom";
// import { Checkbox } from 'react-input-checkbox'
import { useParams } from 'react-router-dom';
import '../style/update.css';
import TeacherCabinet from './TeacherCabinet';
import { BiArrowBack} from "react-icons/bi";
import { CgDisplayGrid} from "react-icons/cg"
import { MdOutlineCreate} from "react-icons/md"; 
import { TiDelete} from "react-icons/ti"


function TeacherPost() {  
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const userId = localStorage.getItem('id')
    let { id } = useParams(); //question id from the url ==> http://localhost:3000/update/32 ==>32
   const [question, setQuestion] = useState({})

useEffect(() => {
    fetch(`http://localhost:8080/get-teacher-question`)
    .then(response => response.json())
    .then(result => {
        let filteredArr = result.filter(question => question.id == id)
        setQuestion(filteredArr[0])
        console.log(filteredArr[0])
    })
}, [])


//     const handleChange = (e) => {
//         let value = e.target.value
//         if(e.target.value === 'on'){
//             value=true
//         }
//         console.log(value)
//         let questionOBJ = 
//         {question: question.question, level: question.level, id: question.id, 
//         answers: [
//         {id: question.answers[0].id, choice: question.answers[0].choice, is_true: question.answers[0].is_true, questionId: question.answers[0].questionId},
//         {id: question.answers[1].id, choice: question.answers[1].choice, is_true: question.answers[1].is_true, questionId: question.answers[1].questionId},
//         {id: question.answers[2].id, choice: question.answers[2].choice, is_true: question.answers[2].is_true, questionId: question.answers[2].questionId},
//         {id: question.answers[3].id, choice: question.answers[3].choice, is_true: question.answers[3].is_true, questionId: question.answers[3].questionId}]
//     }
//     console.log(questionOBJ)
// }
   
const handleSubmit = (e) => {
    e.preventDefault()
    let id = question.id
    console.log(id)
    fetch(`http://localhost:8080/delete-question`,{
        method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({id})
    })
    .then( fetch(`http://localhost:8080/teacher-question-post/${userId}`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({Questions: user.question, level: user.level, choice1:[user.choice1, user.choice1TrueFalse], choice2: [user.choice2, user.choice2TrueFalse], choice3: [user.choice3, user.choice3TrueFalse], choice4: [user.choice4, user.choice4TrueFalse] }) 
        
    })).then(response => response.json())
    .then(result => {
        // check the result if the book was added or not
        navigate(`/my-teacher-list/${userId}`)      
    })
}
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        }, [])
        console.log(user)
    }


    return (
        // <div >
        //     <button> <NavLink to = {`/my-teacher-list/${id}`}>My Questions</NavLink></button>
        //     <h1>Update your QUIZ</h1> 
        //     <form  onSubmit={handleSubmit}>
        //         <label htmlFor="question"> 1. Create your question</label>
        //         <br/>
        //         <input id ="question"className='input' defaultValue={question.question} onChange = {(e)=>handleChange(e)} name = "question" type = "text" placeholder = "Create a question"  />
        //         {/* <input className='input' onChange = {()=>handleChange} name = "level" type = "text" placeholder = "What's a level of difficulty"  /> */}
        //         <select  onChange={(e)=>handleChange(e)} name = "level" defaultValue={question.answers != null ? question.answers[0].level: 'Medium'}>
        //             <option value="Easy">Easy</option>
        //             <option value ="Medium">Medium</option>
        //             <option value="Hard">Hard</option>
        //         </select>
        //         <br/>
        //         <label htmlFor="choice"> 2. Create your choices</label>
        //         <br/>
        //         <input  className='input' onChange={(e)=>handleChange(e)}  defaultValue={question.answers != null ? question.answers[0].choice: ''} name = "choice" type = "text"   />
        //         <label htmlFor="True">True</label>
        //         <input htmlFor="True"className='input' onChange={(e)=>handleChange(e)}  name = "choice1TrueFalse" type = "checkbox" defaultChecked={question.answers != null ? question.answers[0].is_true: false}  /> 
        //         <label htmlFor="False">False</label>
        //         <input id = "False" className='input' onChange={(e)=>handleChange(e)} value={false} name = "choice1TrueFalse" type = "checkbox"   />
        //         <br />
        //         <button >Update</button>
        //     </form> 
        // </div>
        <div className='majorContainerUpdate'>
            <div className='postContainer'>
                <h1 className='titleCreateQuiz'>Update question</h1> 
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
                    <button className='create-quiz'><MdOutlineCreate size={30}/>UPDATE</button>
                    </div>
                 </form> 
            </div>
        </div>
    )
   
}

export default TeacherPost
