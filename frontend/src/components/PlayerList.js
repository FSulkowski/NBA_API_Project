import React, { useState, useEffect } from 'react';
import { getPlayers } from '../services/api';
import PlayerDetails from './PlayerDetails';

function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await getPlayers();
      setPlayers(data);
    };

    fetchPlayers();
  }, []);

  const onSelectPlayer = (playerId) => {
    // Toggle between showing and hiding player stats
    setSelectedPlayerId(prevId => (prevId === playerId ? null : playerId));
  };

  const filteredPlayers = players.filter(player =>
    `${player.first_name} ${player.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Player List</h2>

      {/* Search bar input */}
      <input
        type="text"
        placeholder="Search players by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
      />

      <ul>
        {filteredPlayers.map((player) => (
          <li key={player.id}>
            <div onClick={() => onSelectPlayer(player.id)}>
              {player.first_name} {player.last_name} ({player.is_active ? 'Active' : 'Retired'})
            </div>

            {/* Only show PlayerDetails when the player is selected */}
            {selectedPlayerId === player.id && (
              <div>
                <PlayerDetails playerId={player.id} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;
