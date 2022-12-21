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
    const { choice1, choice2, choice3, choice4, questionId } = req.body

    const questionTeacher = await models.Question.build ({
        Questions:Questions, level:level, UserID: UserID 
    })

    let upload_teacher_question = await questionTeacher.save()

    console.log(upload_teacher_question.dataValues.id)
    const answerTeacher = await models.Answer.bulkCreate ([
        {choice:choice1[0], is_true:choice1[1], questionId: upload_teacher_question.dataValues.id},
        {choice:choice2[0], is_true:choice2[1], questionId: upload_teacher_question.dataValues.id},
        {choice:choice3[0], is_true:choice3[1], questionId: upload_teacher_question.dataValues.id},
        {choice:choice4[0], is_true:choice4[1], questionId: upload_teacher_question.dataValues.id} 
    ])

    // let upload_teacher_answer = await answerTeacher.save()
    res.json({success:'Successfully post questions'})  
})

// const answerTeacher = await models.Answer.build ({
//     choice:choice1[0], is_true:choice1[1], questionId: upload_teacher_question.dataValues.id,
//     choice:choice2[0], is_true:choice2[1], questionId: upload_teacher_question.dataValues.id,
//     choice:choice3[0], is_true:choice3[1], questionId: upload_teacher_question.dataValues.id,
//     choice:choice4[0], is_true:choice4[1], questionId: upload_teacher_question.dataValues.id 
// })

// let upload_teacher_answer = await answerTeacher.save()



// app.post('/teacher-answer-post', async (req, res) => {
//     const { choice1, choice2, choice3, choice4, questionId } = req.body


//     const answerTeacher = await models.Answer.build ({
//         choice:choice1[0], is_true:choice1[1], questionId: upload_teacher_question.dataValues.id,
//         choice:choice2[0], is_true:choice2[1], questionId: upload_teacher_question.dataValues.id,
//         choice:choice3[0], is_true:choice3[1], questionId: upload_teacher_question.dataValues.id,
//         choice:choice4[0], is_true:choice4[1], questionId: upload_teacher_question.dataValues.id 
//     })

//     let upload_teacher_answer = await answerTeacher.save()

//     console.log(upload_teacher_answer)
//     res.json({success:'Successfully posted answers'})  
    
// })

app.get ('/get-teacher-question', async (req,res) => {
    

    const username = req.username 
    const userId = req.id
    // let questionSet = []
    // let obj = {}
    let answersArray = []
    
    let teacher_question = await models.Question.findAll({})
    
    let teacher_answers = await models.Answer.findAll({})
    
    teacher_question.forEach(question => {
        let filteredArr = teacher_answers.filter(answer => answer.questionId == question.id)
        answersArray.push({question: question.Questions, level:question.level, id:question.id, answers:filteredArr})
        // obj.question = choice.Questions
        // obj.answers = filteredAnswers
        // questionSet.push(obj)
    });
    res.json(answersArray)
 
  

    // for (let choice of teacher_question) {
    //     let filteredAnswers = teacher_answers.filter(q => q.dataValues.questionId == choice.id) 
    //     // console.log(filteredAnswers)
    //     obj.question = choice.Questions
    //     obj.answers = filteredAnswers
    //     questionSet.push(obj)

    //      //    console.log(questionSet)
        
            
    //     // choice.choice = filteredAnswers
    // }
   
 
})


//   obj.question = q.Questions
            // //   obj.answers = [...obj.answers, choice.choice, choice.is_true]
            // answersArray.push(choice.choice, choice.is_true)
            // console.log(choice.choice)
            // //   console.log(obj)
            //   questionSet.push(obj)
            //  return questionSet 



app.listen(8080,() => {
    console.log("Let's get ready to rumble!")
})