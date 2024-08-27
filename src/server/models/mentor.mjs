import mongoose from "mongoose";

const mentorSchema = mongoose.Schema({
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
    default: "mentor",
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Mentor = mongoose.model("mentor", mentorSchema);

export default Mentor;
