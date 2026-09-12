import mongoose, { Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userId: { type: String, required: true },
    teamId: { type: String, default: null },
    points: { type: Number, required: true, min: 0, default: 0 },
    period: { type: String, required: true, default: 'all-time' },
  },
  { timestamps: true },
);

leaderboardSchema.index({ period: 1, points: -1 });

export default mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
