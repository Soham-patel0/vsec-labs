import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String, required: true, trim: true, maxLength: 80
    }, rollNumber: {
        type: String, required: true, trim: true, uppercase: true, maxLength: 30, unique: true
    }, department: {
        type: String, required: true, trim: true, maxLength: 80
    }, marks: {
        type: Number, required: true, min: 0, max: 100
    }
}, {
    timestamps: true
});

export const Student = mongoose.model('Student', schema);
