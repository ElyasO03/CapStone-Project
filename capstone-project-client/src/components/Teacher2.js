import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import incrementCount from '../actions/incrementCount.js'
// import { Checkbox } from 'react-input-checkbox'



function TeacherCabinet() {
    const dispatch = useDispatch(); 
    const count = useSelector(state => state.count) 
    console.log(count)
    const id = localStorage.getItem('id')
  
    const [teacher, setTeacher] = useState([])
   
   
    useEffect(() => {
      
        fetchTeacher()
        }, [])
    

    const fetchTeacher = () => {
        // e.preventDefault()
        console.log('teacher')
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
                console.log('teacherElse')
                
            }   
        })
    }
     
    console.log('teacherCab')
    console.log(teacher)
    console.log(id)
    
    // let test = () => {
    //     dispatch(incrementCount(1))
    // }

    let x=0
     
    const teacherItems = teacher.map((myClass, index) =>{
            console.log(myClass.answers[0].choice)
            console.log(count)
        return <div key ={index}>
                  <li>{myClass.question}</li>
                  <li>{myClass.level}</li>
                  {/* <li>{myClass.answers.choice}</li> */}
                  <li>{myClass.answers[count].choice}</li>
                  {/* <button onClick={() =>dispatch(incrementCount(1)) }>Show choices</button> */}

               </div>
    })

    return (
        <>
        {teacherItems}
        <button onClick={() =>dispatch(incrementCount(1)) }>Show choices</button>
        </>
    )




}

export default TeacherCabinet