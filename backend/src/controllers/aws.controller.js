const { asyncHandler } = require("../utils/asyncHandler");
const { CustomError } = require("../utils/CustomError");
const Response = require("../utils/Response");
const AWS = require("../utils/configs/aws.config");
const Ec2 = require("../models/ec2.model");
const S3 = require("../models/s3.model");

const fetchUbuntuAmiId = async () => {
    const ec2 = new AWS.EC2();
    const params = {
        Owners: ["amazon"], 
        Filters: [
            { Name: "name", Values: ["ubuntu/images/hvm-ssd/ubuntu-*-18.04-amd64-server-*"] },
            { Name: "architecture", Values: ["x86_64"] },
            { Name: "virtualization-type", Values: ["hvm"] }
        ]
    };

    const amiData = await ec2.describeImages(params).promise();
    if (amiData.Images.length === 0) {
        throw new CustomError(404, "No suitable Ubuntu AMI found");
    }

    amiData.Images.sort((a, b) => new Date(b.CreationDate) - new Date(a.CreationDate));
    return amiData.Images[0].ImageId; 
};

const createEc2Instance = asyncHandler( async (req, resp) => {
    const ec2 = new AWS.EC2();
    const imageId = await fetchUbuntuAmiId();

    const params = {
        ImageId: imageId,
        InstanceType: "t2.micro",
        MinCount: 1,
        MaxCount: 1
    };

    try {
        const instanceData = await ec2.runInstances(params).promise();

        if(!instanceData) {
            throw new CustomError(500, "Something went wrong while creating ec2 instance");
        }
        console.log("instance details: ", instanceData);
        console.log("instance::", instanceData.Instances);
        console.log("instance[0]:", instanceData.Instances[0]);
        console.log("instance_id:", instanceData.Instances[0].InstanceId);
               
        const instanceDetailForStoring = await Ec2.create({
            instance_id: instanceData.Instances[0].InstanceId,
            instance_details: instanceData
        });

        
        const storedInstance = await Ec2.findById(instanceDetailForStoring._id);
        
        if(!storedInstance) {
            throw new CustomError(500, "Something went wrong while storing the instance data");
        }

        return resp.status(201).json(
            new Response(
                200,
                instanceData,
                "EC2 instance created successfully"       
            )
        );
    } catch (error) {
        throw new CustomError(500, error?.message || "Error while creating EC2 instance");
    };
});

const getAllEc2Instances = asyncHandler(async (req, resp) => {
    try {
        const instances = await Ec2.find().sort({ createdAt: -1 });

        if (!instances.length) {
            throw new CustomError(404, "No EC2 instances found in the database");
        }

        return resp.status(200).json(
            new Response(
                200,
                instances,
                "Stored EC2 instances retrieved successfully"
            )
        );
    } catch (error) {
        throw new CustomError(500, error?.message || "Error retrieving stored EC2 instances");
    };
});


const createS3Bucket = asyncHandler( async (req, resp) => {
    const s3 = new AWS.S3();
    const bucketName = req.body.bucketName;
    try {
        const bucketData = await s3.createBucket({ Bucket: bucketName }).promise();

        if(!bucketData) {
            throw new CustomError(500, "Something went wrong while creating s3 bucket");
        }

         const bucketDetailForStoring = await S3.create({
            bucket_name: bucketName,
            bucket_details: bucketData
        });

        const storedBucket = await S3.findById(bucketDetailForStoring._id);

        if (!storedBucket) {
            throw new CustomError(500, "Something went wrong while storing the S3 bucket data");
        }

        return resp.status(201).json(
            new Response(
                200,
                storedBucket,
                "S3 bucket created successfully"
            )
        )
    } catch (error) {
        throw new CustomError(500, error?.message || "Error while creating S3 bucket");
    };
});

const getAllS3Buckets = asyncHandler( async (req, resp) => {
    const s3 = new AWS.S3();
    try {
        const buckets = await S3.find().sort({ createdAt: -1 });
        if(!buckets) {
            throw new CustomError(404, "No bucket found");
        }
        return resp.status(200).json(
            new Response(
                200,
                buckets,
                "S3 buckets"
            )
        )
    } catch (error) {
        throw new CustomError(500, error?.message || "Something went wrong");
    };
});

module.exports = { 
    createEc2Instance,
    createS3Bucket,
    getAllS3Buckets,
    getAllEc2Instances
};