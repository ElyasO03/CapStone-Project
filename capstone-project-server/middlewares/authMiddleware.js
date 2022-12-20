const jwt = require('jsonwebtoken')
const models = require('../models')


function authenticate(req, res, next) {
    const header = req.headers['authorization']
    if(header) {
        const token = header.split(' ')[1]
        try {
            const decoded = jwt.verify(token, 'QuizAppSuperSecretKey')
            if (decoded) {
                const email = decoded.email
                const authUser = models.User.findOne({
                    where: {
                        email: email
                    }
                })
                if(authUser) {
                    next()
                } else {
                    res.json({error: 'Unable to authenticate 1'})
                }
            } else {
                res.json({error: 'Unable to authenticate 2'})
            }
        } catch {
            res.json({error: 'Unable to authenticate 3'})
        }
    } else {
        res.json({error: 'Required authorization headers are missing.'})
    }
}

module.exports = authenticate 