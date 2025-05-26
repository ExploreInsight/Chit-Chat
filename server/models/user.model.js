import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    fullName:{
        type: String,
        required: true,
        trim: true
    },password:{
        type: String,
        required: true,
        minlength: 6,
    },
    profilePicture:{
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },
},{ timestamps: true});

// Middleware to hash password before saving the user
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

    try {
        const SaltRounds = 11;
        const slat = await bcrypt.genSalt(SaltRounds);
        this.password = await bcrypt.hash(this.password, slat);
        next();
    } catch (error) {
        next(error);
    }
})

// Method to compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
const User = mongoose.model("User", userSchema);

export default User;

