import mongoose, { Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, enum: ['running', 'walking', 'strength', 'cycling', 'other'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.models.Activity || mongoose.model('Activity', activitySchema);
