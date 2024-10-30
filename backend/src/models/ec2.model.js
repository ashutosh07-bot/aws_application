const mongoose = require("mongoose");

const ec2Schema = new mongoose.Schema({
    instanse_id: {
        type: String,
        unique: true,
    },
    instance_details: {
        type: String
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("EC2", ec2Schema);