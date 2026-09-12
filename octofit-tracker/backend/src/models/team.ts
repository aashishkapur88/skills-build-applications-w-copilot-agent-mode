import mongoose, { Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    captainId: { type: String, required: true },
    memberIds: { type: [String], default: [] },
  },
  { timestamps: true },
);

export default mongoose.models.Team || mongoose.model('Team', teamSchema);
