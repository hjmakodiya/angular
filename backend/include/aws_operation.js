const { AWS_BUCKET_NAME } = require("./config")

const uploadFile = (path, fileData, awsObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const putObjectPromise = await awsObj.putObject({ Bucket: AWS_BUCKET_NAME, Key: path, Body: fileData, ServerSideEncryption: "AES256" }).promise();

            if (putObjectPromise.$response.error) {
                throw { status: 401, message: "aws file upload fail" };
            } else {
                let uploadResponse = {
                    requestId: (putObjectPromise.$response.requestId) ? putObjectPromise.$response.requestId : "123456"
                }
                resolve(uploadResponse);
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getFile = (path, awsObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const getObjectPromise = await awsObj.getObject({Bucket: AWS_BUCKET_NAME, Key: path}).createReadStream();
            
            //resolve(getObjectPromise.$response.data.Body)
            resolve(getObjectPromise)
        } catch (error) {
            reject(error)
        }
    })
}

const deleteFile = (path, awsObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteObjectPromise = await awsObj.deleteObject({Bucket: AWS_BUCKET_NAME, Key: path}).promise()
            if (deleteObjectPromise.$response.error) {
                throw { status: 401, message: "aws file delete fail" };
            } else {
                resolve("file deleted successfully")
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    uploadFile,
    getFile,
    deleteFile
}