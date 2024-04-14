const S3client = require('../configs/awss3.config');

const S3_BUCKET = process.env.AWS_S3_BUCKET;

const uploadTheProfilePicture = async (image: Blob) => {
    try {
        const key = Math.random().toString(36).slice(2);

        const params = {
            Bucket: S3_BUCKET,
            Key: key,
            Body: image
        };
    
        const result = await S3client.upload(params).promise();
        return key;
    } catch (e) {
        throw e;
    }
};

const deleteTheProfilePicture = async (s3key: string) => {
    try {
        const params = {
            Bucket: S3_BUCKET,
            Key: s3key
        };

        const result = await S3client.deleteObject(params).promise();
    } catch (e) {
        throw e;
    }
}

module.exports = {
    uploadTheProfilePicture,
    deleteTheProfilePicture
};

export {};