const User = require("../models/user");
const TrackedInfo = require("../models/tracking");
const fs = require("fs");
const path = require("path");

const updatePhoto = async (req, res) => {
    try {
        const { userID } = req.params;
        var postdata = {
            data: fs.readFileSync(path.join(__dirname, '../uploads', req.file.filename)),
            contentType: req.file.mimetype
        }
        await User.findByIdAndUpdate(userID, { "profilePhoto": postdata }, async (err) => {
            if (err) return res.status(500).json({ message: "Something went wrong." });

            fs.readdir(path.join(__dirname, '../uploads'), (err, files) => {
                if (err) throw err;
                for (const file of files) {
                    fs.unlink(path.join(__dirname, '../uploads', file), err => {
                        if (err) throw err;
                    });
                }
            });

            const result = await User.findById(userID);
            res.status(200).json(result);
        }).clone();
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const getUserDetails = async (req, res) => {
    try {
        const { userID } = req.params;
        User.findById(userID, (err, result) => {
            if (err) return res.status(500).json({ message: "Something went wrong in getting user from mongo." });
            res.status(200).json({ user: result });
        })
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const addTrackingInfo = async (req, res) => {
    try {
        const { userID } = req.params;
        const { msID, media_type, addedDate, seasons, last_seasons_episodes, backdrop_path } = req.body;
        const postData = {
            userID: userID,
            msID: msID,
            media_type: media_type,
            addedDate: addedDate,
            seasons: seasons,
            last_seasons_episodes: last_seasons_episodes,
            backdrop_path: backdrop_path
        }
        await TrackedInfo.create(postData);
        res.status(200).json({ massage: "Added successfully." })
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const getUserTracking = async (req, res) => {
    try{
        const { userID } = req.params;
        const tracked_info = await TrackedInfo.find({userID : userID});
        res.status(200).json({ tracked_info });
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = { updatePhoto, getUserDetails, addTrackingInfo, getUserTracking };