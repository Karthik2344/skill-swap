import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    skillsToLearn: {
      type: [String],
      default: [],
    },
    skillsToTeach: {
      type: [String],
      default: [],
    },
    profilePic: {
      type: String,
      default: "https://www.w3schools.com/howto/img_avatar.png",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
