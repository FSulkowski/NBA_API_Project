// backend/cronJobs/cronJobs.js
const cron = require('node-cron');
const { getPlayerStats } = require('../services/api');

cron.schedule('0 2 * * *', async () => {
  console.log('Running cron job to fetch 24-25 season data...');
  try {
    const data = await getPlayerStats('playerId');
    console.log('Data fetched successfully', data);
    // Process and update the database here if necessary
  } catch (error) {
    console.error('Error fetching data', error);
  }
});
