const { default: mongoose } = require('mongoose');
const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;

// Define Schemas
const userSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
});

const adminSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
});

const courseSchema = new Schema({
    title: String,
    description: String,
    price: String,
    imageUrl: String,
    creatorId: ObjectId,
});

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId,
});

// Define Models
const userModel = mongoose.model('user', userSchema); // Correct method: mongoose.model
const adminModel = mongoose.model('admin', adminSchema);
const courseModel = mongoose.model('course', courseSchema);
const purchaseModel = mongoose.model('purchase', purchaseSchema);

// Export Models
module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel,
};