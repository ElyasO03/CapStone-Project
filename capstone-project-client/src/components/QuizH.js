import React, { useState, useEffect } from "react"
import "../style/QuizE.css"
import CountDown from "./CountDown";

function QuizH() {

    const hardQuestions = [
        {
            text: "Which of these snippets would create a react arrow function export component?",
            options: [
                { id: 0, text: "RAFCE", isCorrect: true },
                { id: 1, text: "RCCE", isCorrect: false },
                { id: 2, text: "RFCE", isCorrect: false },
                { id: 3, text: "RCC", isCorrect: false },
            ],
        },
        {
            text: "Which command would create a new React application?",
            options: [
                { id: 0, text: "code application.rjs", isCorrect: false },
                { id: 1, text: "npx create-react-app appname", isCorrect: true },
                { id: 2, text: "npm install react-app", isCorrect: false },
                { id: 3, text: "npm init", isCorrect: false },
            ],
        },
        {
            text: "Which of these represents an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources?",
            options: [
                { id: 0, text: "server management", isCorrect: false },
                { id: 1, text: "DBMS", isCorrect: false },
                { id: 2, text: "CORS | Cross-Origin Resource Sharing (CORS)", isCorrect: true },
                { id: 3, text: "DSP Origin Sharing", isCorrect: false },
            ],
        },
        {
            text: "Which of these is NOT a part of the component life cycle?",
            options: [
                { id: 0, text: "componentWillMount()", isCorrect: true },
                { id: 1, text: "componentDidMount()", isCorrect: false },
                { id: 2, text: "componentDidUpdate()", isCorrect: false },
                { id: 3, text: "componentWillUnmount()", isCorrect: false },
            ],
        },
        {
            text: "All hooks must start with which key word?",
            options: [
                { id: 0, text: "onChange", isCorrect: false },
                { id: 1, text: "push()", isCorrect: false },
                { id: 2, text: "app get()", isCorrect: false },
                { id: 3, text: "use", isCorrect: true },
            ],
        },
        {
            text: "Which of these is an event handler in JavaScript?",
            options: [
                { id: 0, text: 'type="submit"', isCorrect: false },
                { id: 1, text: 'div.submit', isCorrect:  false},
                { id: 2, text: 'e.target.value', isCorrect: false },
                { id: 3, text: "onClick", isCorrect: true },
            ],
        },
        {
            text: "Using Redux, this is the only way to trigger a state change?",
            options: [
                { id: 0, text: 'getState("")', isCorrect: false },
                { id: 1, text: 'handleState()', isCorrect: false },
                { id: 2, text: "dispatch(action)", isCorrect: true },
                { id: 3, text: 'onChange()', isCorrect: false },
            ],
        },
        {
            text: "Which component makes the Redux store available to any nested components?",
            options: [
                { id: 0, text: "import store from 'react-redux'", isCorrect: false },
                { id: 1, text: "npm start", isCorrect: false },
                { id: 2, text: "<Provider>", isCorrect: true },
                { id: 3, text: "npm i Redux", isCorrect: false },
            ],
        },
        {
            text: "Which of these is a component?",
            options: [
                { id: 0, text: "component.js", isCorrect: false },
                { id: 1, text: "Component.js", isCorrect: true },
                { id: 2, text: "component-react-app.js", isCorrect: false },
                { id: 3, text: "componentApp.js", isCorrect: false },
            ],
        },
        {
            text: "Which components can handle hooks?",
            options: [
                { id: 0, text: "Functional Components", isCorrect: true },
                { id: 1, text: "Class Based Components", isCorrect: false },
                { id: 2, text: "Bottom Level Components", isCorrect: false },
                { id: 3, text: "All React Components", isCorrect: false },
            ],
        },

    ];
    function shuffleQuestions(array) { // shuffle hardQuestions to get random questions
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
        }
    
        useEffect(() => {
        restartGame()
        }, []);
    
        const [showResults, setShowResults] = useState(false);
        const [score, setScore] = useState(0);
        const [shuffledQuestions, setShuffledQuestions] = useState([]);
        const [questionsLeft, setQuestionsLeft] = useState();
        const [rightAnswers, setRightAnswers] = useState([])
        const [wrongAnswers, setWrongAnswers] = useState([])
    
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
            let newArr = shuffleQuestions(hardQuestions);
            setShuffledQuestions(shuffleQuestions(newArr));
            setQuestionsLeft(newArr.length - 1);
            setScore(0);
            setRightAnswers([])
            setWrongAnswers([])
            setShowResults(false);
        }
    
        return (
        <>
            {shuffledQuestions.length <= 0 || showResults ? (
                <>
            <div className="final-results">
                <h1>Final Results</h1>
                <h2>
                {" "}
                {score} out of {hardQuestions.length} correct - (
                {(score / hardQuestions.length) * 100}%)
                </h2>
                
                <button onClick={() => restartGame()}>Restart Game</button>
            </div>
                {rightAnswers.length <=0 ? 'No right answers' : rightAnswers.map(answer=>{
                    return <div className="centertr">RIGHT: {answer.text}</div>
                })}
                {wrongAnswers.length <=0 ? 'No wrong answers' : wrongAnswers.map(answer=>{
                    return <div className="centertw">WRONG: {answer.text}</div>
                })}
            </>
            ) : (
            <>
                <h2 className="textc">Hard Programmer Quiz</h2>
                <h2 className="textc">Current Score: {score}</h2>
                <CountDown seconds={149} />
                <h1 className="questionb">{shuffledQuestions[questionsLeft].text}</h1>
                <ul>
                {shuffledQuestions[questionsLeft].options.map((answer) => {
                    return (
                    <li onClick={(e) => handleToggle(e, shuffledQuestions[questionsLeft], answer.isCorrect)}>
                        {answer.text}
                    </li>
                    );
                })}
                </ul>
            </>
            )}
        </>
        );
        }

export default QuizH;