const { Router } = require('express')
const userMiddleware = require('../middleware/user.middleware.js')
const { purchaseModel, courseModel } = require('../models/schema.js')

const courseRouter = Router()

courseRouter.post('/purchase', userMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const courseId = req.body.courseId;

        // Check if the user already purchased the course
        const existingPurchase = await purchaseModel.findOne({ userId, courseId });
        if (existingPurchase) {
            return res.status(400).json({ message: 'You have already purchased this course' });
        }

        // Create a new purchase entry
        await purchaseModel.create({ userId, courseId });
        res.status(200).json({ message: 'Course purchased successfully' });
    } catch (error) {
        console.error('Error purchasing course:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

courseRouter.get('/preview', async (req, res) => {
    const courses = await courseModel.find({})
    res.json({message: 'Course previewed', courses: courses})
})


module.exports = {
    courseRouter: courseRouter
}