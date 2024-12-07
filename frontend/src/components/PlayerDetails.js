import React, { useState, useEffect } from 'react'; 
import '../PlayerDetails.css'; 
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

  const calculateCareerAverages = (stats) => {
    let totalGP = 0;
    let totalGS = 0;
    let totalPPG = 0;
    let totalRPG = 0;
    let totalAPG = 0;
    let totalSPG = 0;
    let totalBPG = 0;
    let totalMPG = 0;
    let totalFG = 0;
    let total3P = 0;
    let totalFT = 0;
    let totalTS = 0;
    let totalPER = 0;

    stats.forEach((stat) => {
      totalGP += stat.gp;
      totalGS += stat.gs;
      totalPPG += stat.ppg * stat.gp;
      totalRPG += stat.rpg * stat.gp;
      totalAPG += stat.apg * stat.gp;
      totalSPG += stat.spg * stat.gp;
      totalBPG += stat.bpg * stat.gp;
      totalMPG += stat.mpg * stat.gp;
      totalFG += stat.fg_pct ? stat.fg_pct * stat.gp : 0;
      total3P += stat.fg3_pct ? stat.fg3_pct * stat.gp : 0;
      totalFT += stat.ft_pct ? stat.ft_pct * stat.gp : 0;
      totalTS += stat.ts_pct ? stat.ts_pct * stat.gp : 0;
      totalPER += stat.per * stat.gp;
    });

    return {
      careerGP: totalGP,
      careerGS: totalGS,
      careerPPG: totalPPG / totalGP,
      careerRPG: totalRPG / totalGP,
      careerAPG: totalAPG / totalGP,
      careerSPG: totalSPG / totalGP,
      careerBPG: totalBPG / totalGP,
      careerMPG: totalMPG / totalGP,
      careerFG: totalFG / totalGP,
      career3P: total3P / totalGP,
      careerFT: totalFT / totalGP,
      careerTS: totalTS / totalGP,
      careerPER: totalPER / totalGP,
    };
  };

  // Helper function to get the best value for each stat
  const getBestStat = (stats, statKey) => {
    return Math.max(...stats.map(stat => stat[statKey]));
  };

  const careerAverages = calculateCareerAverages(stats);

  if (loading) {
    return <div>Loading stats...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Sort stats by season, from most recent to earliest
  const sortedStats = [...stats].sort((a, b) => b.season_id - a.season_id);

  return (
    <div>
      <h3>Stats:</h3>
      <table>
        <thead>
          <tr>
            <th>Season</th>
            <th>GP</th>
            <th>GS</th>
            <th>PPG</th>
            <th>RPG</th>
            <th>APG</th>
            <th>SPG</th>
            <th>BPG</th>
            <th>MPG</th>
            <th>FG%</th>
            <th>3P%</th>
            <th>FT%</th>
            <th>TS%</th>
            <th>PER</th>
          </tr>
        </thead>
        <tbody>
          {/* Player's individual season stats */}
          {sortedStats.length === 0 ? (
            <tr>
              <td colSpan="14">No stats available</td>
            </tr>
          ) : (
            sortedStats.map((stat, index) => (
              <tr key={index}>
                <td>{stat.season_id}</td>
                <td>{stat.gp}</td>
                <td>{stat.gs}</td>
                <td style={{ fontWeight: stat.ppg === getBestStat(stats, 'ppg') ? 'bold' : 'normal' }}>{stat.ppg}</td>
                <td style={{ fontWeight: stat.rpg === getBestStat(stats, 'rpg') ? 'bold' : 'normal' }}>{stat.rpg}</td>
                <td style={{ fontWeight: stat.apg === getBestStat(stats, 'apg') ? 'bold' : 'normal' }}>{stat.apg}</td>
                <td style={{ fontWeight: stat.spg === getBestStat(stats, 'spg') ? 'bold' : 'normal' }}>{stat.spg}</td>
                <td style={{ fontWeight: stat.bpg === getBestStat(stats, 'bpg') ? 'bold' : 'normal' }}>{stat.bpg}</td>
                <td style={{ fontWeight: stat.mpg === getBestStat(stats, 'mpg') ? 'bold' : 'normal' }}>{stat.mpg}</td>
                <td style={{ fontWeight: stat.fg_pct === getBestStat(stats, 'fg_pct') ? 'bold' : 'normal' }}>{stat.fg_pct}%</td>
                <td style={{ fontWeight: stat.fg3_pct === getBestStat(stats, 'fg3_pct') ? 'bold' : 'normal' }}>{stat.fg3_pct}%</td>
                <td style={{ fontWeight: stat.ft_pct === getBestStat(stats, 'ft_pct') ? 'bold' : 'normal' }}>{stat.ft_pct}%</td>
                <td style={{ fontWeight: stat.ts_pct === getBestStat(stats, 'ts_pct') ? 'bold' : 'normal' }}>{stat.ts_pct}%</td>
                <td style={{ fontWeight: stat.per === getBestStat(stats, 'per') ? 'bold' : 'normal' }}>{stat.per}</td>
              </tr>
            ))
          )}

          {/* Last row - Career Averages */}
          <tr>
            <td><strong>Career Averages</strong></td>
            <td><strong>{careerAverages.careerGP}</strong></td>
            <td><strong>{careerAverages.careerGS}</strong></td>
            <td><strong>{careerAverages.careerPPG.toFixed(1)}</strong></td>
            <td><strong>{careerAverages.careerRPG.toFixed(1)}</strong></td>
            <td><strong>{careerAverages.careerAPG.toFixed(1)}</strong></td>
            <td><strong>{careerAverages.careerSPG.toFixed(1)}</strong></td>
            <td><strong>{careerAverages.careerBPG.toFixed(1)}</strong></td>
            <td><strong>{careerAverages.careerMPG.toFixed(1)}</strong></td>
            <td><strong>{careerAverages.careerFG.toFixed(1)}%</strong></td>
            <td><strong>{careerAverages.career3P.toFixed(1)}%</strong></td>
            <td><strong>{careerAverages.careerFT.toFixed(1)}%</strong></td>
            <td><strong>{careerAverages.careerTS.toFixed(1)}%</strong></td>
            <td><strong>{careerAverages.careerPER.toFixed(1)}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PlayerDetails;
