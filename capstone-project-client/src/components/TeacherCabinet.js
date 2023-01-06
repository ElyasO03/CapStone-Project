import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';
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
                setTeacher(result)
                
                
            }   
        })
    }
   

    const deleteChoice = (id) => {
        fetch('http://localhost:8080/delete-choice', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({id}) 
        })
        // window.location.reload(false)
        // navigate('/my-teacher-list/:id')
      }
   
     
    const teacherItems = teacher.map((myClass, index) =>{
        return <div key ={index}>
                  <h3>{myClass.question}</h3>
                  <h5>{myClass.level}</h5>
                  {/* <li>{myClass.answers.choice}</li> */}
                  <h5>{myClass.answers[0].choice}</h5>
                  <button onClick = {()=>deleteChoice(myClass.answers[0].id)}>Delete</button>
                  <h5>{myClass.answers[1].choice}</h5>
                  <button onClick = {()=>deleteChoice(myClass.answers[1].id)}>Delete</button>
                  <h5>{myClass.answers[2].choice}</h5>
                  <button onClick = {()=>deleteChoice(myClass.answers[2].id)}>Delete</button>
                  <h5>{myClass.answers[3].choice}</h5>
                  <button onClick = {()=>deleteChoice(myClass.answers[3].id)}>Delete</button>
                  <button onClick= {()=>navigate(`/update/${myClass.id}`)}>Update</button>

               </div>
    })

    return (
        <>
        {teacherItems}
        <button onClick = {() =>navigate(`/teacher-post/${id}`)}>Back</button>
        </>
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
