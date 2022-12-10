const mongoose = require("mongoose");
const { isEmail, contains } = require("validator");
const filter = require("../util/filter");

/**
 * Schema definition for a user within the application.
 *
 * The User schema includes fields for username, email, password, biography, admin status,
 * and role. It incorporates both validation and sanitization processes to ensure data integrity
 * and appropriateness. Usernames and emails are unique, ensuring no two users can register with
 * the same credentials. The schema also includes automatic timestamps for tracking the creation
 * and last update of each user account.
 *
 * Before saving a user, the schema applies filters to the username and biography to remove any
 * inappropriate content. It also enforces validation rules for the username and email to adhere
 * to specific formatting and content standards.
 *
 * @schema UserSchema
 * @type {mongoose.Schema}
 * @property {String} username - Unique username for the user with character and space restrictions.
 * @property {String} email - Unique and valid email address for the user.
 * @property {String} password - Encrypted password for the user's account.
 * @property {String} biography - Optional biography of the user, with a maximum length constraint.
 * @property {Boolean} isAdmin - Flag indicating whether the user has administrative privileges.
 * @property {String} role - The role of the user within the application, with predefined enumeration.
 */
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: [6, "Username must be at least 6 characters long"],
            maxlength: [30, "Username must be no more than 30 characters long"],
            validate: {
                validator: (val) => !contains(val, " "),
                message: "Username must contain no spaces",
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [isEmail, "Email address must be valid"],
            //select: false, TODO
        },
        password: {
            type: String,
            required: true,
            minLength: [8, "Password must be at least 8 characters long"],
            //select: false, TODO
        },
        biography: {
            type: String,
            default: "",
            maxLength: [250, "Biography must be no more than 250 characters long"],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ["Moderator", "User", "Promoter"],
            default: "User",
        },
    },
    { timestamps: true }
);

/**
 * Pre-save hook to ensure the username does not contain any profanity
 * and to clean any profane words from the biography.
 */
UserSchema.pre("save", function (next) {
    if (filter.isProfane(this.username)) {
        throw new Error("Username cannot contain profanity");
    }

    if (this.biography.length > 0) {
        this.biography = filter.clean(this.biography);
    }

    next();
});

module.exports = mongoose.model("user", UserSchema);