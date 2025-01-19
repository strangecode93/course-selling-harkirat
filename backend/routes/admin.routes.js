const { Router } = require('express');
const bcrypt = require('bcrypt');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const { adminModel, courseModel } = require('../models/schema.js');
const adminMiddleware = require('../middleware/admin.middleware.js');
const mongoose = require('mongoose');

const adminRouter = Router();

// Validation schemas
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

// Admin signup
adminRouter.post('/signup', async (req, res) => {
    try {
        const validatedData = signupSchema.parse(req.body);
        const { email, password, firstName, lastName } = validatedData;

        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        await adminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error('Signup Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Admin signin
adminRouter.post('/signin', async (req, res) => {
    try {
        const validatedData = signinSchema.parse(req.body);
        const { email, password } = validatedData;

        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Admin does not exist' });
        }

        const isPasswordValid = bcrypt.compareSync(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_ADMIN, { expiresIn: '1d' });
        res.status(200).json({ message: 'Admin logged in', token });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error('Signin Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Create a course
adminRouter.post('/course', adminMiddleware, async (req, res) => {
    try {
        const adminId = req.adminId;
        const { title, description, imageUrl, price } = req.body;

        const course = await courseModel.create({
            title,
            description,
            imageUrl,
            price,
            creatorId: adminId,
        });

        res.status(201).json({ message: 'Course created', courseId: course._id });
    } catch (error) {
        console.error('Create Course Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update a course
adminRouter.put('/course', adminMiddleware, async (req, res) => {
    try {
        const adminId = req.adminId;
        const { title, description, imageUrl, price, courseId } = req.body;

        const course = await courseModel.findOneAndUpdate(
            { _id: courseId, creatorId: adminId },
            { title, description, imageUrl, price },
            { new: true }
        );

        if (!course) {
            return res.status(404).json({ message: 'Course not found or not authorized' });
        }

        res.status(200).json({ message: 'Course updated', course });
    } catch (error) {
        console.error('Update Course Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Fetch all courses for the admin
adminRouter.get('/course/bulk', adminMiddleware, async (req, res) => {
    try {
        const adminId = req.adminId;

        const courses = await courseModel.find({ creatorId: adminId });
        res.status(200).json({ message: 'Courses fetched', courses });
    } catch (error) {
        console.error('Fetch Courses Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Fetch course purchase stats with revenue and buyers
adminRouter.get('/course/stats', adminMiddleware, async (req, res) => {
    try {
        const adminId = req.adminId;

        // Fetch stats
        const stats = await courseModel.aggregate([
            // Match courses created by the logged-in admin
            { $match: { creatorId: new mongoose.Types.ObjectId(adminId) } },

            // Lookup purchases related to each course
            {
                $lookup: {
                    from: "purchases", // Ensure the collection name matches exactly
                    localField: "_id", // Match course ID
                    foreignField: "courseId", // Match with purchase courseId
                    as: "purchases", // The resulting array will be added as this field
                },
            },

            // Add a calculated field for the revenue per course
            {
                $addFields: {
                    totalRevenue: {
                        $multiply: [{ $size: "$purchases" }, { $toDouble: "$price" }],
                    },
                },
            },

            // Project the required fields
            {
                $project: {
                    title: 1, // Course title
                    price: 1, // Course price
                    buyers: { $size: "$purchases" }, // Count of buyers
                    totalRevenue: 1, // Total revenue for the course
                },
            },
        ]);

        // Calculate overall stats
        const overallRevenue = stats.reduce((sum, course) => sum + course.totalRevenue, 0);
        const totalBuyers = stats.reduce((sum, course) => sum + course.buyers, 0);

        res.status(200).json({
            message: "Stats fetched",
            totalRevenue: overallRevenue,
            totalBuyers: totalBuyers,
            stats,
        });
    } catch (error) {
        console.error("Stats Fetch Error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});






module.exports = {
    adminRouter,
};
