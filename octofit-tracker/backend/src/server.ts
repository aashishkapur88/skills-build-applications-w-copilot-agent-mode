import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import teamsRouter from './routes/teams.js';
import usersRouter from './routes/users.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
export const port = Number(process.env.PORT || 8000);
export const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use(cors());

app.get('/', (_request, response) => {
  response.json({
    name: 'OctoFit Tracker API',
    apiBaseUrl,
    endpoints: ['/api/health', '/api/users', '/api/teams', '/api/activities', '/api/leaderboard', '/api/workouts'],
  });
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.listen(port, async () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);

  try {
    await connectDatabase();
  } catch (error) {
    console.error('MongoDB unavailable; API is running without database access.', error);
  }
});