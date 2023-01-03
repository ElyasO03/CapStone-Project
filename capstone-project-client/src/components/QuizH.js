import React, { useState } from "react"
import "../style/QuizE.css"

function QuizH() {

    const [showResults, setShowResults] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

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

const optionClicked = (isCorrect) => {
    if(isCorrect) {
        setScore(score + 1);
    }

    if(currentQuestion +1 < hardQuestions.length) {
        setCurrentQuestion(currentQuestion +1);
    } else {
        setShowResults(true);
    }
}

const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
}


    return (
        <>
            <div className="QuizE">

                <h2>Hard Programmer Quiz</h2>

                <h2>Current Score: {score}</h2>


                {showResults ? (
                    <div className="final-results">
                        <h1>Final Results</h1>
                        <h2> {score} out of {hardQuestions.length} correct - ({(score/hardQuestions.length) * 100}%)</h2>
                        <button onClick={() => restartGame()}>Restart Game</button>
                    </div>
                ) : (
                    <div className="question-card">
                        <h2>Question {currentQuestion + 1} out of {hardQuestions.length}</h2>
                        <h3 className="question-text">{hardQuestions[currentQuestion].text}</h3>

                        <ul>
                            {hardQuestions[currentQuestion].options.map((option) => {
                                return(
                                    <li onClick={() => optionClicked(option.isCorrect)} key={option.id}>{option.text}</li>
                                )
                            })}
                        </ul>
                    </div>
                )}

            </div>
        </>
    );
}

export default QuizH;