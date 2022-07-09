const signupSchema = {
    type: "object",
    required: ["email", "password", "first_name", "last_name"],
    properties: {
        email: {
            type: "string",
            minLength: 3,
        },
        password: {
            type: "string",
            minLength: 3,
        },
        first_name: {
            type: "string",
            minLength: 3
        },
        last_name: {
            type: "string",
            minLength: 3
        }
    },
};

const loginSchema = {
    type: "object",
    required: ["email", "password"],
    properties: {
        email: {
            type: "string",
            minLength: 3,
        },
        password: {
            type: "string",
            minLength: 3,
        }
    },
};

const trackingSchema = {
    type: "object",
    required: ["msID", "addedDate", "media_type", "last_seasons_episodes", "seasons"],
    properties: {
        msID: {
            type: "string"
        },
        media_type: {
            type: "string"
        },
        addedDate: {
            type: "string"
        },
        seasons: {
            type: "number"
        },
        last_season_episodes:{
            type: "number"
        }
    },
};

module.exports = {
    loginSchema, signupSchema, trackingSchema
};