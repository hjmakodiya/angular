const awsSdk = require('aws-sdk');
const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_REGION } = require("./config")

const s3Pool = () => {
    return new Promise((resolve, reject) => {
        try {
            awsSdk.config.update(
                { 
                    "accessKeyId": AWS_ACCESS_KEY, 
                    "secretAccessKey": AWS_SECRET_KEY, 
                    region: AWS_BUCKET_REGION
                }
            );
            s3 = new awsSdk.S3();
            resolve(s3)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    s3Pool
}