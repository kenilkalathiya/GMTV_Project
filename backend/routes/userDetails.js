const express = require("express");
const router = express.Router();
const { updatePhoto, getUserDetails, addTrackingInfo, getUserTracking, checkTracking } = require("../controllers/userDetails");
const { auth, userIdCheck, validation } = require("../middlewares/auth");
const { uploadedImg } = require("../middlewares/updatePhoto");
const { trackingSchema } = require("../json-schema/user");

const { Validator }  = require("express-json-validator-middleware");
const { validate } = new Validator();

router.get("/userinfo/:userID",userIdCheck, auth, getUserDetails);
router.post("/updatePhoto/:userID",userIdCheck, auth, uploadedImg, updatePhoto);
router.get("/tracking/:userID", userIdCheck, auth, getUserTracking);
router.get("/checkTracking/:userID/:msID", userIdCheck, auth, checkTracking);
router.post("/tracking/:userID", validate({ body: trackingSchema }), validation ,userIdCheck, auth, addTrackingInfo);

module.exports = router;