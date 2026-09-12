import mongoose from 'mongoose';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ada Lovelace', email: 'ada@example.com', fitnessLevel: 'advanced' },
      { name: 'Grace Hopper', email: 'grace@example.com', fitnessLevel: 'intermediate' },
      { name: 'Katherine Johnson', email: 'katherine@example.com', fitnessLevel: 'beginner' },
    ]);

    const userIds = users.map((user) => user._id.toString());
    const teams = await Team.insertMany([
      {
        name: 'Code Sprinters',
        captainId: userIds[0],
        memberIds: [userIds[0], userIds[1]],
      },
      {
        name: 'Orbit Walkers',
        captainId: userIds[2],
        memberIds: [userIds[2]],
      },
    ]);

    await User.bulkWrite([
      { updateOne: { filter: { _id: users[0]._id }, update: { teamId: teams[0]._id.toString() } } },
      { updateOne: { filter: { _id: users[1]._id }, update: { teamId: teams[0]._id.toString() } } },
      { updateOne: { filter: { _id: users[2]._id }, update: { teamId: teams[1]._id.toString() } } },
    ]);

    await Activity.insertMany([
      { userId: userIds[0], type: 'running', durationMinutes: 35, points: 70 },
      { userId: userIds[1], type: 'cycling', durationMinutes: 45, points: 90 },
      { userId: userIds[2], type: 'walking', durationMinutes: 30, points: 30 },
    ]);

    await Leaderboard.insertMany([
      { userId: userIds[0], teamId: teams[0]._id.toString(), points: 70 },
      { userId: userIds[1], teamId: teams[0]._id.toString(), points: 90 },
      { userId: userIds[2], teamId: teams[1]._id.toString(), points: 30 },
    ]);

    await Workout.insertMany([
      {
        title: 'Starter Strength Circuit',
        description: 'A balanced introduction to bodyweight strength training.',
        fitnessLevel: 'beginner',
        durationMinutes: 20,
        exercises: ['Squats', 'Incline push-ups', 'Glute bridges', 'Plank'],
      },
      {
        title: 'Tempo Run Builder',
        description: 'Build speed and endurance with alternating running intervals.',
        fitnessLevel: 'intermediate',
        durationMinutes: 35,
        exercises: ['Warm-up jog', 'Tempo interval', 'Recovery jog', 'Cool-down'],
      },
      {
        title: 'Power and Mobility',
        description: 'A challenging full-body session combining power and mobility.',
        fitnessLevel: 'advanced',
        durationMinutes: 45,
        exercises: ['Jump squats', 'Burpees', 'Single-leg deadlifts', 'World\'s greatest stretch'],
      },
    ]);

    console.log('Database seeding complete: 3 users, 2 teams, 3 activities, 3 leaderboard entries, 3 workouts');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
