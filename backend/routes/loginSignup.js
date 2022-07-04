const express = require("express");
const router = express.Router();
const { userCheck, validation } = require("../middlewares/auth");
const { login, signup, getMsg } = require("../controllers/loginSignup");

const { Validator }  = require("express-json-validator-middleware");
const { validate } = new Validator();

const { loginSchema, signupSchema }  = require("../json-schema/user.js");

router.post("/signup", validate({ body: signupSchema }), validation, signup);
router.post("/login", validate({ body: loginSchema }), validation, userCheck, login);

module.exports = router;