import React, { useState, useEffect } from 'react';
import { getPlayerStats } from '../services/api';

function PlayerDetails({ playerId }) {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await getPlayerStats(playerId);
        setStats(data);
      } catch (err) {
        setError('Failed to load stats');
      } finally {
        setLoading(false);
      }
    };

    if (playerId) {
      fetchStats();
    }
  }, [playerId]);

  if (loading) {
    return <div>Loading stats...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3>Stats:</h3>
      <ul>
        {stats.length === 0 ? (
          <li>No stats available</li>
        ) : (
          stats.map((stat, index) => (
            <li key={index}>
              {stat.season_id}: 
              <br/>
              <br/>
              {stat.ppg} PPG 
              <br/>
              {stat.rpg} RPG
              <br/>
              {stat.apg} APG
              <br/>
              {stat.spg} SPG
              <br/>
              {stat.bpg} BPG
              <br/>
              {stat.gp} GP 
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default PlayerDetails;
