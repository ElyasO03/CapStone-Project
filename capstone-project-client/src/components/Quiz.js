import React, { useEffect, useState } from "react";
import axios from 'axios'

function Quiz() {
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([]);

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

    const optionClicked = (is_true) => {
        if (is_true) {
            setScore(score + 1);
        }
    }

    const filterQuestions = (level) => {
        return questions.filter(question => {
            return question.level.toLowerCase() == level.toLowerCase() 
        })
    }

    const questionItems = questions.map(question => {

        const choiceItems = question.answers.map(answer => {
            let lvl = question.level
            let dispTest = []
            if(lvl == 'True'){
                let testDum = question.question

                // let testAns = question[0].answers[0].choice
                // console.log(testAns)
                // dispTest.push(testAns)
                dispTest.push(testDum)
                // console.log(dispTest)
            
            return (
                <div>
                    {dispTest}
                </div>
            )}
        })

        return (
            <div>
                <h1 key={question.id}>Questions: {question.question}</h1>
                {choiceItems}
            </div>
        )
    })

    return (
        <>
            <div>
                <h1>Quiz</h1>

                <h2>Current score: {score}</h2>

            </div>
            <div>
            {questionItems}
            </div>
        </>
    )
}






//     const questionItems = questions.filter(q => q.level == selectedLevel).map(question => {

//         const choiceItems = question.answers.map(answer => {
//             let lvl = question.level
//             if(lvl == 'easy'){
//                 console.log('in the if statement')
//             }
//             return (
//                 <div>
//                     <button key={answer.id} onClick={() => optionClicked(answer.is_true)}>{answer.choice}</button>
//                 </div>
//             )
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

export default Quiz;