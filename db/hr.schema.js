const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    image: { type: String },
    phone: { type: String },
    company: { type: String },
    location: { type: String },
    position: { type: String },
    experience: { type: String },
    website: { type: String },
    password: { type: String }
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);

module.exports = Recruiter;
