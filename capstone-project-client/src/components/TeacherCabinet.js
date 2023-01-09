import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import '../style/cabinet.css';
import { FaTrashAlt} from "react-icons/fa";
import { TiDelete} from "react-icons/ti"; 
import { IoIosCreate} from "react-icons/io"

// import { Checkbox } from 'react-input-checkbox'



function TeacherCabinet(props) {

    const id = localStorage.getItem('id')
    const navigate = useNavigate()
  
    const [teacher, setTeacher] = useState([])
   
   
    useEffect(() => {
        fetchTeacher()
        }, [])
    

    const fetchTeacher = () => {
        // e.preventDefault()
        fetch(`http://localhost:8080/my-teacher-list/${id}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(result => {
            if(result.error) {
                console.log(result.error)
            } else {
                console.log(result)
                setTeacher(result)
                
                
            }   
        })
    }
   

    const deleteChoice = (id) => {
        console.log(id)
        fetch('http://localhost:8080/delete-choice', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({id}) 
        })
        window.location.reload(false)
        // navigate('/my-teacher-list/:id')
      }
   
   const deleteQuestion = (question) => {
    let id = question.id
    fetch('http://localhost:8080/delete-question', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({id}) 
    })
     window.location.reload(false)
   }
    const teacherItems = teacher.map((myClass, index) =>{

        return <div className='question-and-choices' key ={index}>
                 <div className='question-and-choices-button'>
                    <button className = 'updateButton' onClick= {()=>navigate(`/update/${myClass.id}`)} ><IoIosCreate size={30}/>Update</button>
                    <button className = 'deleteButton'onClick={()=>deleteQuestion(myClass)}>Delete Question<TiDelete size={30}/></button> 
                 </div>
                 <div className='question-level'>
                 <h3 className='questionMain'>{myClass.question}</h3>
                 <h3 className='questionMain'>{myClass.level}</h3>
                 </div>

                  
                  {/* <li>{myClass.answers.choice}</li> */}
           
                 <div className='choices-and-buttons'>
                    <div className='choice-delete'>
                    <h5 className='choiceMain'> {myClass.answers[0].choice} </h5>
                    <FaTrashAlt className='trash' size={25}><button onClick = {()=>deleteChoice(myClass.answers[0].id)}></button></FaTrashAlt>
                    </div>
                    <div className='choice-delete'>
                    <h5 className='choiceMain'>{myClass.answers[1].choice}</h5> 
                    <FaTrashAlt className='trash' size={25}><button onClick = {()=>deleteChoice(myClass.answers[1].id)}>Delete</button></FaTrashAlt> 
                    </div>
                    <div className='choice-delete'>
                    <h5 className='choiceMain'>{myClass.answers[2].choice}</h5> 
                    <FaTrashAlt className='trash' size={25}><button onClick = {()=>deleteChoice(myClass.answers[2].id)}>Delete</button></FaTrashAlt> 
                    </div>
                    <div className='choice-delete'>
                    <h5 className='choiceMain'>{myClass.answers[3].choice}</h5> 
                    <FaTrashAlt className='trash' size={25}><button onClick = {()=>deleteChoice(myClass.answers[3].id)}>Delete</button></FaTrashAlt>
                    </div> 
                  {/* <button onClick= {()=>navigate(`/update/${myClass.id}`)} >Update</button> */}
                  </div>
                

               </div>
    })

    return (
        <div className='teacherItems'>
        {teacherItems}
        {/* <button onClick = {() =>navigate(`/${id}`)}>Back</button> */}
        </div>
    )




}

const mapStateToProps =(state) =>{
    return {
       
        isAuth: state.isAuthenticated,
        role: state.role,
        username: state.username
        
    }
}


export default connect (mapStateToProps)(TeacherCabinet)