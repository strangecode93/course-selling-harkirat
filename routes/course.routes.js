const { Router } = require('express')
const userMiddleware = require('../middleware/user.middleware.js')
const { purchaseModel, courseModel } = require('../models/schema.js')

const courseRouter = Router()

courseRouter.post('/purchase', userMiddleware, async (req, res) => {
    const userId = req.userId
    const courseId = req.body.courseId
    await purchaseModel.create({userId: userId, courseId: courseId})
    res.json({message: 'Course purchased successfully'})
})
courseRouter.get('/preview', async (req, res) => {
    const courses = await courseModel.find({})
    res.json({message: 'Course previewed', courses: courses})
})


module.exports = {
    courseRouter: courseRouter
}