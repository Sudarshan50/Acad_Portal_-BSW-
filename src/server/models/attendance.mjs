import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    mentor: {
        type:mongoose.Schema.Types.ObjectId,//reference to mentor
        ref: 'mentor',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photoPath: {
        type: [String], // Assuming file URL
        // Limiting to 10MB
    },
    approved_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'moderator',
        default:null
    },
    disapproved_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'moderator',
        default:null
    },
    status:{
        type: String,
        default: 'UNAPPROVED'
    },
    hours: {
        type: Number,
        default: 0
    },
    last_action_moderator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'moderator',
        default:null
    }
});

// attendanceSchema.virtual('status').get(function() {
//     if (!this.last_action_moderator) {
//         return 'UNAPPROVED';
//     } else if (this.hours === 0) {
//         return 'REJECTED';
//     } else {
//         return 'APPROVED';
//     }
// });

const Attendance = mongoose.model('attendance', attendanceSchema);

export default Attendance;