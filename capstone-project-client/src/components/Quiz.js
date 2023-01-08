import React, { useEffect, useState } from "react";
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import '../style/quiz.css';
import '../style/student.css';
import { right } from "@popperjs/core";
import CountDown from '../components/CountDown';
import Pagination from 'react-bootstrap/Pagination';
import { useDispatch, useSelector} from 'react-redux'
import incrementCount from '../actions/incrementCount.js' 
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';

function Quiz(props) {
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [rightOption, setRightOption] = useState('')
    const [choiceOption, setChoiceOption] = useState({})
    const [userSelection, setUserSelection] = useState ({})
    const [teacherList, setTeacherList] = useState([])
    const [filteredQuestions, setFilteredQuestions] = useState([])
    // const [currentPage, setCurrentPage] = useState(1);
    // // const [message, setMessage] = useState('');
    // const isAnonymous = true;


    // const handleClick = event => {
    //     event.currentTarget.disabled = true;
    //     console.log('button clicked');
    // };
    // const [isDisabled, setDisabled] = useState(false);
  
    // const handleSubmit = () => {
    //     console.log('button is disabled');
    //     setDisabled(true);
    // }



    useEffect(() => {
        axios
            .get('http://localhost:8080/get-teacher-question')
            .then(res => {
                console.log(res.data)
                setQuestions(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        axios
            .get('http://localhost:8080/all-teachers')
            .then(res => {
                console.log(res.data)
                setTeacherList(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const savedUserChoice = (questionID, answerID, is_true)=> {
         
        //  const findcode = (questionID, userSelection) => {
        //     var idx = userSelection.indexOf(questionID)
        //     if(idx >=0 && idx<userSelection.length && idx++)
        //     return 
        //  }
        // const userCurrentChoiceId = userSelection.findOne({where: {qionID:questionID}})
        // console.log(userSelection)uest
        // if (userCurrentChoiceId) {
        //     return 
        //   }     
        const userCurrentChoiceId = userSelection[questionID]
        console.log (userSelection)
        if (userCurrentChoiceId) {
            return 
        } if (is_true) {
            setScore(score + 1)
        }  
        setUserSelection({
            ...userSelection,
            [questionID]: answerID
         })
        console.log(userCurrentChoiceId)
    }

    

    const classNameForChoice = (questionAndChoice) => {

        if(questionAndChoice == null) {
          return "initial-answer"
        }  
        let userChoiceID = userSelection[questionAndChoice.questionID]
        return userChoiceID == questionAndChoice.choiceID ? "right-answer": "initial-answer" 
    }

    const wellOrWrong = (questionAndChoice) => {

        if(questionAndChoice == null) {
          return "initial-answer"
        }  
        let userChoiceID = userSelection[questionAndChoice.questionID]
        return userChoiceID == questionAndChoice.choiceID ? "right-answer": "initial-answer" 
    }




//     const choiceStatement = (choice)=> {
//         if(is_true == null) {
//             return "pressed"
//           }  
//           let userChoiceID = choiceOption[choice.is_true]
//           return userChoiceID == choice.choiceID ? "right-answer": "pressed"

//         setChoiceOption({
//            ...choiceOption,
//            [is_true]: choiceID
//         })
//    }
    
//    const otherQuestions = (otherOptions) => {
//     if(otherOptions == null) {
//         return "initial-answer"
//       }
//       let userChoiceID = userSelection[otherOptions.is_true]
//       return userChoiceID !== otherOptions.choiceID ?  "initial-answer":  "initial-answer"
//    }



    // const optionClicked = (is_true) => {
    //     if (is_true) {
    //         setScore(score + 1)
    //     } 

    // }


    // const questionItems = questions.filter(questions => questions.level === 'easy').map(question => {


    //     const choiceItems = question.answers.map(answer => {
    //         let lvl = question.level
    //         if(lvl === 'easy'){
    //         }
    //         return (
    //             <>
    //             <div  key={answer.id}>
    //                 {/* <div className={choiceStatement(answer.is_true ?{is_true: answer.is_true, choiceID: answer.id}: null)}><b>Well Done</b></div> */}
    //                 <button className={classNameForChoice(answer.is_true ? {questionID: question.id, choiceID: answer.id}: null)} 
    //                 onClick={() => {savedUserChoice(question.id, answer.id, answer.is_true)}} >{answer.choice}</button>

    //             </div>
    //             </>
    //         )
    //     })

    //     return (
    //         <div>
    //             <h1 key={question.id}>Questions: {question.question}</h1>
    //             {choiceItems}
    //         </div>
    //     )
    // })
let result =  questions.map(question => {
    console.log(question.question)
    return question.question
})
    // console.log(result)
const handleSpecificTeacher = (teacherId) => {
        let filterQuestions = questions.filter(question => question.userId == teacherId)
        console.log(filterQuestions)
        setFilteredQuestions(filterQuestions)
}



    return (
        <>

<DropdownButton id="dropdown-basic-button" title="Choose teacher">
    {teacherList.map(teacher=>{
        return <Dropdown.Item onClick={()=>handleSpecificTeacher(teacher.id)}>{teacher.username}</Dropdown.Item>
    })}
    <Dropdown.Item onClick={()=>setFilteredQuestions(questions)}>all teachers</Dropdown.Item>
    </DropdownButton>


    return (
        <div className="mainContainerStudent">

            <div>
                <h1>Quiz</h1>

                <h2>Current score: {score}</h2>
                {/* <CountDown seconds={179} /> */}
            </div>
            <div className="questionItems">
                {questionItems}
            </div>
          
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title>quizlevelselected</Card.Title>
                    <Card.Text>
                       {filteredQuestions.length <= 0 ? result : filteredQuestions.map(question => question.question) }
                    </Card.Text>
                    </Card.Body>
                    <Card.Body>
                    <Button href="#">Previous</Button>
                    <Button href="#">Next</Button>
                    </Card.Body>
                    </Card>
            



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


export default connect (mapStateToProps)(Quiz)

{/* <Card style={{ width: '18rem' }}>
<Card.Body>
<Card.Title>quizlevelselected</Card.Title>
<Card.Text>
    {questionItems}
</Card.Text>
</Card.Body>
<Card.Body>
<Button href="#">Previous</Button>
<Button href="#">Next</Button>
</Card.Body>
</Card>




 */}



//     const filterQuestions = (level) => {
//         return questions.filter(question => {
//             return question.level.toLowerCase() == level.toLowerCase() 
//         })
//     }

//     const questionItems = questions.map(question => {

//         const choiceItems = question.answers.map(answer => {
//             let lvl = question.level
//             let dispTest = []
//             if(lvl == 'True'){
//                 let testDum = question.question

//                 // let testAns = question[0].answers[0].choice
//                 // console.log(testAns)
//                 // dispTest.push(testAns)
//                 dispTest.push(testDum)
//                 // console.log(dispTest)
            
//             return (
//                 <div>
//                     {dispTest}
//                 </div>
//             )}
//         })

//         return (
//             <div>
//                 <h1 key={question.id}>Questions: {question.question}</h1>
//                 {choiceItems}
//             </div>
//         )
//     })

//     return (
//         <>
//             <div>
//                 <h1>Quiz</h1>

//                 <h2>Current score: {score}</h2>

//             </div>
//             <div>
//             {questionItems}
//             </div>
//         </>
//     )
// }

// const questionItems = questions.filter(questions => questions.level === 'easy').map(question => {

//     const choiceItems = question.answers.map(answer => {
//         console.log(answer)
//         let lvl = question.level
//         if(lvl === 'easy'){
//         }
//         return (
//             <>
//             {/* {rightOption =='' &&( */}
//             <div >
//                 <button
//                 className={answer.is_true === true ? 'right-answer' : 'initial-answer'} 
//                 key={answer.id} 
//                 onClick={() => {savedUserChoice(question.id, answer.id); choiceStatement(answer.is_true, answer.id)}}>{answer.choice}</button>
//             </div>
//             {/* )} */}
//              {/* {rightOption =='green' &&(
//             <div >
//                 <button  key={answer.id} onClick={() => optionClicked(answer.is_true)}>{answer.choice}</button>
//             </div>
//             )} */}
//             </>
//         )
//     })

//     return (
//         <div>
//             <h1 key={question.id}>Questions: {question.question}</h1>
//             {choiceItems}
//         </div>
//     )
// })