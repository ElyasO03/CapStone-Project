const express = require('express')
const app = express() 
const cors = require('cors')
const models = require('./models')

app.use(cors())
app.use(express.json())


app.get('/register', (req, res) => {
    res.render('/register')
})

app.post('/register', async (req, res) => {
    const { username, email, password, Role } = req.body
    
    const user = await models.User.build({
       username:username, email:email, password: password, Role:Role
    })

    let user_upload = await user.save()

    console.log(user_upload)
    res.json({success:'Successfully registered'})
})

app.post('/teacher-question-post', async (req, res) => {
    const { Questions, level, UserID } = req.body

    const questionTeacher = await models.Question.build ({
        Questions:Questions, level:level, UserID: UserID 
    })

    let upload_teacher_question = await questionTeacher.save()

    console.log(upload_teacher_question)
    res.json({success:'Successfully post questions'})  
})

app.post('/teacher-answer-post', async (req, res) => {
    const { choice, is_true, questionId } = req.body

    const answerTeacher = await models.Answer.build ({
        choice:choice, is_true:is_true, questionId: questionId 
    })

    let upload_teacher_answer = await answerTeacher.save()

    console.log(upload_teacher_answer)
    res.json({success:'Successfully posted answers'})  
    
})

// app.get ('/get-teacher-question', async (req,res) => {
    
//     const username = req.username 
//     const userId = req.id
    
//     let teacher_question = await models.Questions.findAll({})
//     let teacher_answers =await models.Answers.findAll({})
//     for (let choice of teacher_question) {
//         let filteredAnswers = teacher_answers.filter(q => q.questionId == choice.id)
//         choice.choice = filteredAnswers
//     }
//     res.json({Questions:teacher_question})  
// })














app.listen(8080,() => {
    console.log("Let's get ready to rumble!")
})