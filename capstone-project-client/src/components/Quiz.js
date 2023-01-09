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
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';


function Quiz(props) {
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [rightOption, setRightOption] = useState('')
    const [choiceOption, setChoiceOption] = useState({})
    const [userSelection, setUserSelection] = useState ({})
  
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


    const questionItems = questions.filter(questions => questions.level === 'Easy' || questions.level === 'Medium' || questions.level === 'Hard').map(question => {

        const choiceItems = question.answers.map(answer => {
            let lvl = question.level
            if(lvl === 'Easy' || lvl === 'Medium' || lvl === 'Hard'){
            }
            return (
                <>
                <div className="choicesDiv" key={answer.id}>
                    {/* <div className={choiceStatement(answer.is_true ?{is_true: answer.is_true, choiceID: answer.id}: null)}><b>Well Done</b></div> */}
                    <button className={classNameForChoice(answer.is_true ? {questionID: question.id, choiceID: answer.id}: null)} 
                    
                    onClick={() => {savedUserChoice(question.id, answer.id, answer.is_true)}} >{answer.choice}</button>

                </div>
                </>
            )
        })

        return (
            <div className="questionAndAnswer">
                <h1 className="question" key={question.id}>Questions: {question.question}</h1>
                <div className="choice">
                <h5 className="eachChoice">{choiceItems}</h5>
                </div>
                
            </div>
        )
    })

    return (
        <div>

            <h1 className="titleQuiz" >Big School</h1>
            <div className="mainContainerStudent">
                <div className="title-score">

                        
                    

                    <h2 className="score">Current score: {score}</h2>
                    {/* <div className="score"><CountDown  seconds={179} /></div> */}
                </div>
                <div className="questionItems">
                    {questionItems}
                </div>
            </div>
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


