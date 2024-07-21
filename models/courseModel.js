import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    semester: {
        type: String,
        require: true
    },
    academy: {
        type: String,
        require: true
    },
    department: {
        type: String,
        require: true
    },
    courseName: {
        type: String,
        require: true
    },
    courseURL: {
        type: String,
        require: true
    },
    instructor: {
        type: String,
        require: true
    },
    instructorURL: {
        type: String,
        require: true
    },
    creditHours: {
        type: String,
        require: true
    },
}, {timestamps: true})

const Course = mongoose.model("Course", CourseSchema);
export default Course;