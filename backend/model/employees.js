const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
    name: { type: String, required: true, trim: true }, 
    email: { type: String, required: true, trim: true }, 
    department : {type: Schema.Types.ObjectId, ref: 'department'},
    gender: { type: String, required: true, trim: true }, 
    experience : { type: Number, required: true},
    salary: { type: Schema.Types.Decimal128, required: true },
    is_active: { type: Boolean, required: true, default: true },
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now }
});

const Employee = mongoose.model('employee', EmployeeSchema);
module.exports = Employee;