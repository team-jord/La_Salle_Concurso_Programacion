
module.exports = app => {
    //Required package
    var pdf = require("pdf-creator-node");
    var fs = require("fs");
    var router = require("express").Router();
    const pdfController = require("../controllers/pdf.controller");

    // Read HTML Template

    router.get("/service-request/:id", pdfController.getServiceRequestPDF);
    
    router.get("/price-request/:id", pdfController.getPriceRequestPDF);
    
    router.get("/verification-contract/:id", pdfController.getVerificationContractPDF);

    router.get("/evaluation-act/:actId/:fileId", pdfController.getEvaluationActPDF);

    router.get("/verification-list-minor/:id", pdfController.getVerificationListMinorPDF);

    router.get("/verification-list-major/:id", pdfController.getVerificationListMajorPDF);

    router.get("/verification-site-list/:id", pdfController.getVerificationSiteListPDF);

    router.get("/verification-list-anex-b/:id", pdfController.getVerificationListAnexBPDF);

    router.get("/test-comprobation/:id", pdfController.getTestComprobationPDF);

    router.get("/dictum/:id", pdfController.getDictumPDF);

    router.get("/dictum-cover/:id", pdfController.getDictumCoverPDF);

    app.use('/pdf/', router);
}