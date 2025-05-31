import mongoose, {models, Schema} from "mongoose";

const FeedbackSchema = new Schema(
    {
        feedback : String
    },{ timestamps: true }
)
export const Feedback = mongoose.models.Feedback || mongoose.model('Feedback',FeedbackSchema)