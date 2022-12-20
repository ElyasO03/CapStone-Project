import {useState, useEffect} from 'react'



function AdminQuestions () {
    const [questions, setQuestions] = useState([])

  
    const fetchAdminQuetions = () => {
        fetch('http://localhost:8080/get-teacher-question', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
                if(result.error) {
                    console.log(result.error)
                } else {
                    setQuestions(result)
                    
                }
        })

    }

        const questionItems = questions.map(question => {
            return <li>
                 
                   </li>
        })

        

    return (
        <>
        
        </>
    )


}

export default AdminQuestions