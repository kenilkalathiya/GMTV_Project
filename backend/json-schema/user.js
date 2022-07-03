const signupSchema = {
    type: "object",
    required: ["email", "password", "name"],
    properties: {
        email: {
            type: "string",
            minLength: 3,
        },
        password: {
            type: "string",
            minLength: 3,
        },
        name: {
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

module.exports = {
    loginSchema, signupSchema
};