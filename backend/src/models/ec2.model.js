const mongoose = require("mongoose");

const ec2Schema = new mongoose.Schema({
    instance_id: {
        type: String, 
        required: true,
    },
    instance_details: {
        type: mongoose.Schema.Types.Mixed, 
        required: true,
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("EC2", ec2Schema);
