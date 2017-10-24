var mongoose = require("mongoose");
var schema = mongoose.Schema({
    name: {
        type: String,
        reqired: true
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: false
    },
    country: {
        type: String//,
        //reqired: false //(defauls)
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

var Student = mongoose.model("Student", schema);

module.exports = Student;