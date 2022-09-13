module.exports = app => {
    var router = require("express").Router();
    const CandidateController = require("../controllers/candidate.controller");

    const region = process.env.AWS_REGION;
    const bucketName = process.env.AWS_BUCKET_NAME;
    const accessKeyId = process.env.AWS_ACCESS_KEY;
    const secretAccesKey = process.env.AWS_SECRET_KEY;

    const fs = require('fs');
    const path = require('path');

    const multer = require('multer')

    const multerS3 = require('multer-s3')

    const aws = require('aws-sdk');

    const s3 = new aws.S3({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccesKey,
        region: region,
        apiVersion: "2010-12-01",
    });

    const upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: bucketName,
            contentType: multerS3.AUTO_CONTENT_TYPE,
            metadata: (req, file, cb) => {
                cb(null, { fieldName: file.fieldname })
            },
            key: (req, file, cb) => {
                cb(null, Date.now().toString() + file.originalname)
            }
        })
    })

    router.get("/:id", CandidateController.findOne);

    router.post("/", upload.single('img'), CandidateController.create);

    app.use('/candidate', router);
}