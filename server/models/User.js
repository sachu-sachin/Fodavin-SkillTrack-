import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin","learner"], default: "learner" },
    status: { type: String, enum: ["active","inactive","banned"], default: "active" },
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: "LearnerProfile" },
    refreshTokens: [{
        token: { type: String },
        createdAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

userSchema.index({ email: 1 });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // only password change will trigger this hash
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.passwordCheck = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export default mongoose.model("User", userSchema);