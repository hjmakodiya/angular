const mongoose = require('mongoose');
const { Schema } = mongoose;

function getCosts(value) {
    if (typeof value !== 'undefined') {
       return parseFloat(value.toString());
    }
    return value;
};

const EmployeeSchema = new Schema({
    name: { type: String, required: true, trim: true }, 
    email: { type: String, required: true, trim: true }, 
    department : {type: Schema.Types.ObjectId, ref: 'department'},
    gender: { type: String, required: true, trim: true }, 
    experience : { type: Number, required: true},
    salary: { type: Schema.Types.Decimal128, required: true },
    is_active: { type: String, required: true, default: "yes"  },
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now }
});
//}, {toJSON: {getters: true}});

const Employee = mongoose.model('employee', EmployeeSchema);
module.exports = Employee;