// const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
// const util = require('util');
// const connection = require('../Model/model');

// const promisifiedExecute = util.promisify(connection.execute).bind(connection);

// const addVideoUrl = async (req, res) => {
//   try {
//     const { originalname, buffer } = req.file;

//     // Upload video to S3
//     const s3Params = {
//       Bucket: 'forimg123456',
//       Key: `recorded-video-${Date.now()}-${originalname}`,
//       Body: buffer,
//       ContentType: 'video/webm',
//       ACL: 'public-read',
//     };

//     const s3Client = new S3Client({
//       region: 'ap-south-1',
//       credentials: {
//         accessKeyId: 'AKIA4E24YR4CKYBOYCU3',
//         secretAccessKey: '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',
//       },
//     });

//     const s3Response = await s3Client.send(new PutObjectCommand(s3Params));

//     // Save S3 URL to MySQL
//     const videoUrl = s3Response.Location;

//     const insertQuery = 'INSERT INTO tbl_urls (video_url) VALUES (?)';
//     await promisifiedExecute(insertQuery, [videoUrl]);

//     res.json({ success: true, videoUrl });
//   } catch (error) {
//     console.error('Error uploading to S3:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };

// module.exports = {
//   addVideoUrl,
// };

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const util = require('util');
const connection = require('../Model/model');

// Check if connection.execute is a function
if (typeof connection.execute !== 'function') {
  throw new Error('connection.execute is not a function');
}

// Check if connection.execute supports promisification
if (!connection.execute[util.promisify.custom]) {
  throw new Error('connection.execute does not support promisification');
}

// Use util.promisify directly on connection.execute if it supports promisification
const promisifiedExecute = util.promisify(connection.execute);

const addVideoUrl = async (req, res) => {
  try {
    const { originalname, buffer } = req.file;

    // Upload video to S3
    const s3Params = {
      Bucket: 'forimg123456',
      Key: `recorded-video-${Date.now()}-${originalname}`,
      Body: buffer,
      ContentType: 'video/webm',
      ACL: 'public-read',
    };

    const s3Client = new S3Client({
      region: 'ap-south-1',
      credentials: {
        accessKeyId: 'AKIA4E24YR4CKYBOYCU3',
        secretAccessKey: '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',
      },
    });

    const s3Response = await s3Client.send(new PutObjectCommand(s3Params));

    // Save S3 URL to MySQL
    const videoUrl = s3Response.Location;

    const insertQuery = 'INSERT INTO tbl_urls (video_url) VALUES (?)';

    // Use the promisified version directly
    await promisifiedExecute(insertQuery, [videoUrl]);

    res.json({ success: true, videoUrl });
  } catch (error) {
    console.error('Error uploading to S3:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

module.exports = {
  addVideoUrl,
};
