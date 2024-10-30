const mongoose = require("mongoose");

const s3Schema = new mongoose.Schema({
    bucket_name: {
        type: String,
        required: true,
        unique: true
    },
    bucket_details: {
        type: Object,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("S3", s3Schema);
