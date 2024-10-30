const express = require("express");
const { 
    createEc2Instance, 
    createS3Bucket,
    getAllS3Buckets,
    getAllEc2Instances
} = require("../controllers/aws.controller");


const router = express.Router();

router.route("/ec2").post(createEc2Instance).get(getAllEc2Instances);
router.route("/s3").post(createS3Bucket).get(getAllS3Buckets);

module.exports = router;