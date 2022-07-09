const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!isPasswordCorrect)
            return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ user: {email:existingUser.email, password:existingUser.password} }, process.env.SECRET_KEY, {
            expiresIn: process.env.TOKEN_LIFETIME,
        });
        res.status(200).json({ existingUser, token });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const signup = async (req, res) => {
    const { email, password, first_name, last_name } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(409).json({ message: "User already exists." })
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({
            email: email,
            password: hashedPassword,
            profilePhoto: {},
            first_name:first_name,
            last_name:last_name
        });
        const token = jwt.sign({ user: result }, process.env.SECRET_KEY, {
            expiresIn: process.env.TOKEN_LIFETIME,
        });
        res.status(200).json({ result, token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { login, signup };