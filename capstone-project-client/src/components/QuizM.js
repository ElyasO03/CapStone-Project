/* This is importing the React library and the useState hook from the React library. */
import React, { useState } from "react"
import "./QuizE.css"

function QuizM() {

    const [showResults, setShowResults] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);


    const mediumQuestions = [
        {
            text: "Which solution would display numbers from 1 to 10 in JavaScript ?",
            options: [
                { id: 0, text: "Console.log(1, 10)", isCorrect: false },
                { id: 1, text: "Node 1 a 10", isCorrect: false },
                { id: 2, text: " for(let num = 1; num <= 10; num++) {  console.log(num) } ", isCorrect: true },
                { id: 3, text: " for num1 in range(1, 11):  for num2 in range(1, 11):  print(num1 * num2)", isCorrect: false },
            ],
        },
        {
            text: "Which HTTP method requests a representation of the specified resource. This request should only retrieve data?",
            options: [
                { id: 0, text: "GET", isCorrect: true },
                { id: 1, text: "POST", isCorrect: false },
                { id: 2, text: "DELETE", isCorrect: false },
                { id: 3, text: "PUT", isCorrect: false },
            ],
        },
        {
            text: "Which JavaScript math method returns the smallest of zero or more numbers?",
            options: [
                { id: 0, text: "map()", isCorrect: false },
                { id: 1, text: "min()", isCorrect: true },
                { id: 2, text: "push()", isCorrect: false },
                { id: 3, text: "value()", isCorrect: false },
            ],
        },
        {
            text: "Which status code represents that everything is running properly?",
            options: [
                { id: 0, text: "500", isCorrect: false },
                { id: 1, text: "404", isCorrect: false },
                { id: 2, text: "200", isCorrect: true },
                { id: 3, text: "405", isCorrect: false },
            ],
        },
        {
            text: "Which of these keywords in JavaScript are used in a loop to stop the execution of the loop?",
            options: [
                { id: 0, text: "Clear", isCorrect: false },
                { id: 1, text: "Exit", isCorrect: false },
                { id: 2, text: "Stop", isCorrect: false },
                { id: 3, text: "Break", isCorrect: true },
            ],
        },
        {
            text: "Which JavaScript math method returns the largest of zero or more numbers?",
            options: [
                { id: 0, text: "value()", isCorrect: false },
                { id: 1, text: "max()", isCorrect: true },
                { id: 2, text: "map()", isCorrect: false },
                { id: 3, text: "push()", isCorrect: false },
            ],
        },
        {
            text: 'Which sequelize command lists the status of all migrations?',
            options: [
                { id: 0, text: "sequelize db:migrate:status", isCorrect: true },
                { id: 1, text: "npm install redux", isCorrect: false },
                { id: 2, text: "sequelize db:status:migration", isCorrect: false },
                { id: 3, text: "SQL MIGRATION STATUS", isCorrect: false },
            ],
        },
        {
            text: 'This JavaScript array method returns true if the function returns true for all elements',
            options: [
                { id: 0, text: "value()", isCorrect: false },
                { id: 1, text: "forEach", isCorrect: false },
                { id: 2, text: "includes()", isCorrect: false },
                { id: 3, text: "every()", isCorrect: true },
            ],
        },
        {
            text: 'How would you initialize a package.json?',
            options: [
                { id: 0, text: "const timeEl = document.getElementById('time');", isCorrect: false },
                { id: 1, text: "node package.json", isCorrect: false },
                { id: 2, text: "npm init", isCorrect: true },
                { id: 3, text: "initialize package.json", isCorrect: false },
            ],
        },
        {
            text: 'Which command would create and place you inside a new branch in one step?',
            options: [
                { id: 0, text: "git checkout -b branchName", isCorrect: true },
                { id: 1, text: "git add .", isCorrect: false },
                { id: 2, text: "git branch branchName", isCorrect: false },
                { id: 3, text: "touch branch branchName", isCorrect: false },
            ],
        },
    ];

const optionClicked = (isCorrect) => {
    if(isCorrect) {
        setScore(score + 1);
    }

if(currentQuestion +1 < mediumQuestions.length) {
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

                <h2>Medium Programmer Quiz</h2>

                <h2>Current Score: {score}</h2>


                {showResults ? (
                    <div className="final-results">
                        <h1>Final Results</h1>
                        <h2> {score} out of {mediumQuestions.length} correct - ({(score/mediumQuestions.length) * 100}%)</h2>
                        <button onClick={() => restartGame()}>Restart Game</button>
                    </div>
                ) : (
                    <div className="question-card">
                        <h2>Question {currentQuestion + 1} out of {mediumQuestions.length}</h2>
                        <h3 className="question-text">{mediumQuestions[currentQuestion].text}</h3>

                        <ul>
                            {mediumQuestions[currentQuestion].options.map((option) => {
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

export default QuizM;