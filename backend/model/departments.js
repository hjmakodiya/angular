const mongoose = require('mongoose');
const { Schema } = mongoose;

const DepartmentSchema = new Schema({
    name: { type: String, required: true, trim: true }, 
    floor : { type: String, required: true, trim: true },
    is_active: { type: String, required: true, default: "yes" },
    create_date: { type: Date, default: Date.now }
});

const Department = mongoose.model('department', DepartmentSchema);
module.exports = Department;