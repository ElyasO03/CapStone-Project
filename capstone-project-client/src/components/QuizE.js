import React, { useState } from "react"
import "../style/QuizE.css"
import CountDown from "./CountDown";

function QuizE() {

    const [showResults, setShowResults] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [userSelection, setUserSelection] = useState({})

    const easyQuestions = [
        {
            id: 1,
            text: "What CSS property sets the margins of an element by specifying top, bottom, left, and right margins. All either specifying length and percentage?",
            options: [
                { id: 0, text: "Padding", isCorrect: false },
                { id: 1, text: "Border", isCorrect: false },
                { id: 2, text: "Margin", isCorrect: true },
                { id: 3, text: "Body", isCorrect: false },
            ],
        },
        {
            id: 2,
            text: "Which represents Array?",
            options: [
                { id: 0, text: "{ }", isCorrect: false },
                { id: 1, text: "[ ]", isCorrect: true },
                { id: 2, text: "('')", isCorrect: false },
                { id: 3, text: "()", isCorrect: false },
            ],
        },
        {
            id: 3,
            text: "Which represents Object?",
            options: [
                { id: 0, text: "{ }", isCorrect: true },
                { id: 1, text: "[ ]", isCorrect: false },
                { id: 2, text: "('')", isCorrect: false },
                { id: 3, text: "()", isCorrect: false },
            ],
        },
        {
            id: 4,
            text: "Which represents String?",
            options: [
                { id: 0, text: "[]", isCorrect: false },
                { id: 1, text: "()", isCorrect: false },
                { id: 2, text: "{ }", isCorrect: false },
                { id: 3, text: "('')", isCorrect: true },
            ],
        },
        {
            id: 5,
            text: "Which of these elements represents a button in HTML?",
            options: [
                { id: 0, text: "<import button> </import button>", isCorrect: true },
                { id: 1, text: "import button from 'elements'", isCorrect: false },
                { id: 2, text: "<button> </button>", isCorrect: false },
                { id: 3, text: "<br> </br>", isCorrect: false },
            ],
        },
        {
            id: 6,
            text: "Which of these is the correct way to import your CSS stylesheet in HTML?",
            options: [
                { id: 0, text: ' <link rel="stylesheet" href="styles.css">', isCorrect: true },
                { id: 1, text: ' <script src="app.js"></script>', isCorrect: false },
                { id: 2, text: 'import React,{useState} from "react"', isCorrect: false },
                { id: 3, text: 'import "../images/random.css"', isCorrect: false },
            ],
        },
        {
            id: 7,
            text: 'Given the following code "<div id="style"> </div>", How would you change the color of this "div" using CSS?',
            options: [
                { id: 0, text: '.style{background-color:white}', isCorrect: false },
                { id: 1, text: '@style{background-color:white}', isCorrect: false },
                { id: 2, text: '#style{background-color:white}', isCorrect: true },
                { id: 3, text: 'bodyStyle{background-color:white}', isCorrect: false },
            ],
        },
        {
            id: 8,
            text: 'What does https stand for?',
            options: [
                { id: 0, text: "HTML Transparent Protection Services", isCorrect: false },
                { id: 1, text: "Hyperlink Text Transmission Security", isCorrect: false },
                { id: 2, text: "Hypertext transfer protocol secure", isCorrect: true },
                { id: 3, text: "HyperText Transmission Private Services", isCorrect: false },
            ],
        },
        {
            id: 9,
            text: 'Which of the following is not a data type in JavaScript?',
            options: [
                { id: 0, text: "Strings", isCorrect: false },
                { id: 1, text: "Integer", isCorrect: true },
                { id: 2, text: "Booleans", isCorrect: false },
                { id: 3, text: "Numbers", isCorrect: true },
            ],
        },
        {
            id: 10,
            text: 'Which tag would be used to link test.js to our html?',
            options: [
                { id: 0, text: "<link href='./test.js'></link>", isCorrect: false },
                { id: 1, text: "import '../images/test.js'", isCorrect: false },
                { id: 2, text: "<script src='test.js'></script>", isCorrect: true },
                { id: 3, text: " dateEl.innerHTML = days[test]", isCorrect: false },
            ],
        },
    ];

    const optionClicked = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        if (currentQuestion + 1 < easyQuestions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    }

    const restartGame = () => {
        setScore(0);
        setCurrentQuestion(0);
        setShowResults(false);
        window.location.reload(false);
    }

    const handleOptionSelection = (easyQuestionId, optionId) => {
        setUserSelection({
            ...userSelection,
            [easyQuestionId]: optionId
        })
    }

    const classNameForOption = (easyQuestionAndOption) => {
        if (easyQuestionAndOption == null) {
            return "option"
        }

        console.log(easyQuestionAndOption)

        let userOptionId = userSelection[easyQuestionAndOption.easyQuestionId]
        return userOptionId === easyQuestionAndOption.optionId ? "correct" : "option"
    }

    const easyQuestionItem = easyQuestions.map(easyQuestion => {
        return <div><h3 className="question-text" key={easyQuestion.id}>Question: {easyQuestion.text}</h3>

        {easyQuestion.options.map((option) => {
            return <div className = {classNameForOption(option.isCorrect ? {easyQuestionId: easyQuestion.id, optionId: option.id}: null)} key = {option.id}>{option.text} <button onClick = {() => handleOptionSelection(easyQuestion.id, option.id)}></button></div>
        })}
        </div>
    })

    return (
        <>
            <div className="QuizE">

                <h2>Easy Programmer Quiz</h2>

                <h2>Current Score: {score}</h2>

                <CountDown seconds={149} />

                {showResults ? (
                    <div className="final-results">
                        <h1>Final Results</h1>
                        <h2> {score} out of {easyQuestions.length} correct - ({(score / easyQuestions.length) * 100}%)</h2>
                        <button onClick={() => restartGame()}>Restart Game</button>
                    </div>
                ) : (
                    <div className="question-card">
                        <h2>Question {currentQuestion + 1} out of {easyQuestions.length}</h2>
                        <h3 className="question-text">{easyQuestions[currentQuestion].text}</h3>

                        <ul>
                            {easyQuestions[currentQuestion].options.map((option) => {
                                return (
                                    <li onClick={() => optionClicked(option.isCorrect)} key={option.id}>{option.text}</li>
                                )
                            })}
                        </ul>
                    </div>
                )}

            </div>
            {easyQuestionItem}
        </>
    );
}

export default QuizE;