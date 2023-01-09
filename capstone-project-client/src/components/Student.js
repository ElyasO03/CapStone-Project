import React, { useEffect, useState } from "react";
import axios from 'axios'
import "../style/QuizE.css";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { NavLink } from "react-router-dom";
import CountDown from "./CountDown";

const Quiz = () => {

    
    function shuffleQuestions(array) { // shuffle easyQuestions to get random questions
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
        }
        
      
        
        const [showResults, setShowResults] = useState(false);
        const [score, setScore] = useState(0);
        const [easyQuestions, setEasyQuestions] = useState([])
        const [shuffledQuestions, setShuffledQuestions] = useState([]);
        const [questionsLeft, setQuestionsLeft] = useState(0);
        const [rightAnswers, setRightAnswers] = useState([])
        const [wrongAnswers, setWrongAnswers] = useState([])
        const [teacherList, setTeacherList] = useState([])
        useEffect(() => {
            axios
                .get('http://localhost:8080/get-teacher-question')
                .then(res => {
                    let data = res.data
                    // console.log(res.data)
                    // console.log(data.length)
                    setEasyQuestions(res.data)
                    setQuestionsLeft(data.length -1)
                    
                })
                .catch(err => {
                    console.log(err)
                })
                
        }, [])
        useEffect(() => {
            axios
                .get('http://localhost:8080/all-teachers')
                .then(res => {
                    /* Logging the data from the response. */
                    // console.log(res.data)
                    setTeacherList(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }, [])
        
        const handleToggle = (e, answer,isCorrect) => {
            // console.log(answer)
        if (isCorrect == true) {
            e.currentTarget.classList.toggle("green");
            rightAnswers.push(answer)
            setScore(score + 1);
            setTimeout(timeout, 1000, e.currentTarget, "green");
        } else {
            e.currentTarget.classList.toggle("red");
            wrongAnswers.push(answer)
            setTimeout(timeout, 1000, e.currentTarget, "red");
        }
        };
        
        const timeout = (e, color) => {
        setQuestionsLeft(questionsLeft - 1);
        if (questionsLeft === 0) {
            setShowResults(true);
        }
        e.classList.remove(color);
        // console.log(questionsLeft);
        };
        
        
        const restartGame = () => {
        // let newArr = shuffleQuestions(easyQuestions);
        // // console.log(easyQuestions)
        // setShuffledQuestions(shuffleQuestions(newArr));
        // // console.log(shuffledQuestions)
        // setQuestionsLeft(questionsLeft - 1);
        // setScore(0);
        // setRightAnswers([])
        // setWrongAnswers([])
        // setShowResults(false);
        }

        // console.log(questionsLeft)

        const handleSpecificTeacher = (teacherId) => {
            let filterQuestions = easyQuestions.filter(question => question.userId == teacherId)
            console.log(filterQuestions)
            console.log(filterQuestions.length)
            setEasyQuestions(filterQuestions)
            setQuestionsLeft(filterQuestions.length-1)
    }
        return (
        <>

<DropdownButton id="dropdown-basic-button" title="Choose teacher">
    {teacherList.map(teacher=>{
        return <Dropdown.Item onClick={()=>handleSpecificTeacher(teacher.id)}>{teacher.username}</Dropdown.Item>
    })}
    {/* <Dropdown.Item onClick={()=>setEasyQuestions(allQuestions)}>all teachers</Dropdown.Item> */}
    </DropdownButton>

            {easyQuestions.length <= 0 || showResults ? (
                <>
            <div className="final-results">
                <h1>Final Results</h1>
                <h2>
                {" "}
                {score} out of {easyQuestions.length} correct - (
                {(score / easyQuestions.length) * 100}%)
                </h2>
                
                <button><NavLink to="/"></NavLink>Restart Game</button>
            </div>
                {/* {rightAnswers.length <=0 ? 'No right answers' : rightAnswers.map(answer=>{
                    return <div>RIGHT: {answer.text}</div>
                })}
                {wrongAnswers.length <=0 ? 'No wrong answers' : wrongAnswers.map(answer=>{
                    return <div>WRONG: {answer.text}</div>
                })} */}
            </>
            ) : (
            <>
                <h2 className="textc">Easy Programmer Quiz</h2>
                <h2 className="textc">Current Score: {score}</h2>
                <CountDown seconds={299} />
                <h1 className="questionb">{easyQuestions[questionsLeft].question}</h1>
                <h1 className="questionb">level: {easyQuestions[questionsLeft].level}</h1>
                <ul>
                {easyQuestions[questionsLeft].answers.map((answer) => {
                    return (
                    <li onClick={(e) => handleToggle(e, easyQuestions[questionsLeft], answer.is_true)}>
                        {answer.choice}
                    </li>
                    );
                })}
                </ul>
            </>
            )}
        </>
        );
        }
        

export default Quiz


