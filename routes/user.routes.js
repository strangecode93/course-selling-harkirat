const { Router } = require('express')
const bcrypt = require('bcrypt')
const {z} = require('zod')
const {userModel, purchaseModel, courseModel} = require('../models/schema.js')
const jwt = require('jsonwebtoken')
const userMiddleware = require('../middleware/user.middleware.js')

const userRouter = Router()

const signupSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
});

const signinSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

// user signup 
userRouter.post('/signup', async (req, res) => {
    const validatedData = signupSchema.parse(req.body);
    const { email, password, firstName, lastName } = validatedData
    try {
        const existingUser = await userModel.findOne({email: email})
        if(existingUser) {
            return res.status(400).json({message: 'User already exists'})
        }
        const hashedPassword = bcrypt.hashSync(password, 10)
        userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
        res.status(200).json({message: 'User created'})
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ message: error.message });
    }
})

// user signin 
userRouter.post('/signin', async (req, res) => {
    const validatedData = signinSchema.parse(req.body)
    const {email, password} = validatedData
    try {
        const existingUser = await userModel.findOne({email: email})
        if(!existingUser) {
            return res.status(400).json({message: 'User does not exist'})
        }
        const isPasswordValid = bcrypt.compareSync(password, existingUser.password)
        if(!isPasswordValid) {
            return res.status(400).json({message: 'Something went wrong'}) // invalid password
        }
        const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET_USER, {expiresIn: '1d'})
        res.status(200).json({message: 'User logged in', token: token})
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ message: error.message });
    }
})

// user purchases
// userRouter.get('/purchases', userMiddleware, async (req, res) => {
//     const userId = req.userId
//     const purchases = await purchaseModel.find({userId: userId})
//     const courseData = await courseModel.find({
//         _id: {$in: purchases.map(purchase => purchase.courseId)}
//     })
//     res.json({message: 'Purchases fetched', purchases: purchases, courseData: courseData})
// })
userRouter.get("/purchases", userMiddleware, async function(req, res) {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})

module.exports = {
    userRouter: userRouter
}

