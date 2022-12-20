const express = require('express')
const app = express() 
const cors = require('cors')
const models = require('./models')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const authenticate = require('./middlewares/authMiddleware')

app.use(cors())
app.use(express.json())

app.get('/token', (req, res) => {
    const token = jwt.sign({}, 'QuizAppSuperSecretKey')
    res.json({ token: token})
})

app.get('/register', (req, res) => {
    res.render('/register')
})

app.post('/register', async (req, res) => {
    const { username, email, password, Role } = req.body
    console.log(req.body)
    let salt = await bcrypt.genSalt(10)
    let HashedPassword = await bcrypt.hash(password, salt)
    let user = await models.User.findOne({where: {email:email}})
    if(user) {
        res.json({errorMessage: 'This user already exists please use a different email '})
    } else {
        const newUser = await models.User.build({
            username:username, email:email, password: HashedPassword, Role:Role
         })
         await newUser.save()
         res.json({success: 'Registered Succesfully :)'})
    }
})

app.post('/login', async (req, res) => {
    const {email, password, Role } = req.body
    let user = await models.User.findOne({where: {email: email, Role: Role}})
    if (user) {
        const result = await bcrypt.compare(password, user.password)
        if (result) {
            const token = jwt.sign({email: user.email}, "QuizAppSuperSecretKey")
            res.json({ success: true, token: token, email: user.email, Role: user.Role})
        } else {
            res.json({ success: false, message: 'Username or password is incorrect.' })

        }
    } else {res.json({success: false, message: 'This user Does Not Exist Please register!'})}
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