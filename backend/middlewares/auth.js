const Users = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userCheck = async (req, res, next) => {
    try {
        const { email } = req.body;
        const userFound = await Users.findOne({ email: email });
        if (userFound) {
            next();
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch {
        res.status(400).json({ message: "Something went wrong" });
    }
}

const validation = async (error, req, res, next) => {
    try {
        if (error.validationErrors)
            return res.status(400).json({
                errors: error.validationErrors,
            });
        next();
    } catch (error) {
        console.log(error);
    }
};

const auth = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) return res.status(401).send({ auth: false, err });
        req.decoded = decoded;
        next();
      });
    } catch (error) {
      res.status(401).json({ "message":"Error in authentication." })
    }
  };

const userIdCheck = async (req, res, next) => {
    if(mongoose.Types.ObjectId.isValid(req.params.userID)){
        const userFound = await Users.findById(req.params.userID);
        // console.log('sfound:',songFound);
        if(userFound)
        {
          next();
        }
        else
        {
          res.status(400).json({ message: "User not found!" })
        }
      }
      else
      {
        res.status(400).json({ message: "Invalid User ID!" })
    
      }
}

module.exports = { userCheck, validation, auth, userIdCheck }