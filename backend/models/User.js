const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['Doctor', 'Patient'], required: true },
    specialization: { type: String, required: function() { return this.userType === 'Doctor'; } },
    age: { type: Number, required: function() { return this.userType === 'Patient'; } }
    
});



module.exports = mongoose.model('User', UserSchema);
