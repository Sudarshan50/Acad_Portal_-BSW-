import mongoose from "mongoose";

const modSchema = mongoose.Schema({
  kerberos: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "mentor", "mod"],
    default: "mod",
    required: true,
  },
});

const Moderator = mongoose.model("moderator", modSchema);

export default Moderator;
