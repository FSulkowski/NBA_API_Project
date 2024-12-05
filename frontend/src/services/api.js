import axios from 'axios';

// Base URL for the Flask backend
const API_BASE_URL = 'http://127.0.0.1:5000';

export const getPlayers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/players`);
    return response.data;
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
};

export const getPlayerStats = async (playerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/player_stats/${playerId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching stats for player ${playerId}:`, error);
    return [];
  }
};
