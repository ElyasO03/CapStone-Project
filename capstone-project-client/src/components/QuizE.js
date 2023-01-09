import React, { useState, useEffect } from "react";
import "../style/QuizE.css";
import CountDown from "./CountDown";

function QuizE() {
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
                {
                    id: 0,
                    text: ' <link rel="stylesheet" href="styles.css">',
                    isCorrect: true,
                },
                { id: 1, text: ' <script src="app.js"></script>', isCorrect: false },
                {
                    id: 2,
                    text: 'import React,{useState} from "react"',
                    isCorrect: false,
                },
                { id: 3, text: 'import "../images/random.css"', isCorrect: false },
            ],
        },
        {
            id: 7,
            text: 'Given the following code "<div id="style"> </div>", How would you change the color of this "div" using CSS?',
            options: [
                { id: 0, text: ".style{background-color:white}", isCorrect: false },
                { id: 1, text: "@style{background-color:white}", isCorrect: false },
                { id: 2, text: "#style{background-color:white}", isCorrect: true },
                { id: 3, text: "bodyStyle{background-color:white}", isCorrect: false },
            ],
        },
        {
            id: 8,
            text: "What does https stand for?",
            options: [
                {
                    id: 0,
                    text: "HTML Transparent Protection Services",
                    isCorrect: false,
                },
                {
                    id: 1,
                    text: "Hyperlink Text Transmission Security",
                    isCorrect: false,
                },
                { id: 2, text: "Hypertext transfer protocol secure", isCorrect: true },
                {
                    id: 3,
                    text: "HyperText Transmission Private Services",
                    isCorrect: false,
                },
            ],
        },
        {
            id: 9,
            text: "Which of the following is not a data type in JavaScript?",
            options: [
                { id: 0, text: "Strings", isCorrect: false },
                { id: 1, text: "Integer", isCorrect: true },
                { id: 2, text: "Booleans", isCorrect: false },
                { id: 3, text: "Numbers", isCorrect: true },
            ],
        },
        {
            id: 10,
            text: "Which tag would be used to link test.js to our html?",
            options: [
                { id: 0, text: "<link href='./test.js'></link>", isCorrect: false },
                { id: 1, text: "import '../images/test.js'", isCorrect: false },
                { id: 2, text: "<script src='test.js'></script>", isCorrect: true },
                { id: 3, text: " dateEl.innerHTML = days[test]", isCorrect: false },
            ],
        },
    ];

    function shuffleQuestions(array) { // shuffle easyQuestions to get random questions
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

    const handleToggle = (e, answer, isCorrect) => {
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
        let newArr = shuffleQuestions(easyQuestions);
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
                            {score} out of {easyQuestions.length} correct - (
                            {(score / easyQuestions.length) * 100}%)
                        </h2>

                        <button onClick={() => restartGame()}>Restart Game</button>
                    </div>
                    {rightAnswers.length <= 0 ? 'No right answers' : rightAnswers.map(answer => {
                        return <div className="centertr">RIGHT: {answer.text}</div>
                    })}
                    {wrongAnswers.length <= 0 ? 'No wrong answers' : wrongAnswers.map(answer => {
                        return <div className="centertw">WRONG: {answer.text}</div>
                    })}
                </>
            ) : (
                <>
                    <div className="topt">
                        <h2 className="textc">Easy Programmer Quiz</h2>
                        <h2 className="textc">Current Score: {score}</h2>
                        <CountDown className="textc" seconds={169} />
                        <h1 className="questionb">{shuffledQuestions[questionsLeft].text}</h1>
                    </div>
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

export default QuizE;