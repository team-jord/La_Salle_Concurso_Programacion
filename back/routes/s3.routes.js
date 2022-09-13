module.exports = app => {
    var router = require("express").Router();

    const db = require("../models");
    const TechnicalFile = db.technicalFile;

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

    router.post('/upload-file/:fileId', upload.single('file'), async (req, res) => {

        try {
            const fileId = req.params.fileId;

            let technicalFile = await TechnicalFile.findByPk(fileId);
            let files = [];
            console.log(technicalFile)
            files = technicalFile.files;

            if (req.file.key != null) {
                let file = {
                    key: req.file.key,
                    name: req.file.originalname
                }
                files.push(file)
            }

            let response = await TechnicalFile.update({ files: files }, { where: { id: fileId } })
            console.log(response)
            res.send({ data: 'Éxito al subir la imagen' });
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'Error al subir la imagen' });
        }


    })

    router.get('/get-object-url/:key', async (req, res) => {
        try {
            const key = req.params.key;
            var params = { Bucket: bucketName, Key: key };
            let url = s3.getSignedUrl('getObject', params);

            res.send(url);
        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: "Error al obtener el link de descarga"
            })
        }
    })

    router.put('/delete-object/:fileId', async (req, res) => {
        try {
            const key = req.body.key;
            const fileId = req.params.fileId;
            const bucketParams = { Bucket: bucketName, Key: key };
            s3.deleteObject(bucketParams, function (err, data) {
                if (err) console.log(err, err.stack);  // error
                else {
                    console.log('Ok')
                };
            });
            let response = await TechnicalFile.update({ files: req.body.files }, { where: { id: fileId } })          

            res.send('ok')

        } catch (err) {
            res.status(500).send({
                message: "Error al eliminar la imagen"
            })
        }
    })

    app.use('/s3', router);
}