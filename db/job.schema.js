const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String
    },
    jobDescription: {
        type: String
    },
    jobRequirements: {
        type: String
    },
    jobLocation: {
        type: String
    },
    salary: {
        type: String
    },
    deadline: {
        type: Date
    },
    email: {
        type: String
    },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
