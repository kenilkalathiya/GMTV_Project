const Users = require("../models/user");

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

module.exports = { userCheck, validation }