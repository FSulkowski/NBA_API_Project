import React, { useState } from 'react';
import PlayerList from './components/PlayerList';
import PlayerDetails from './components/PlayerDetails';



function App() {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [selectedPlayerName, setSelectedPlayerName] = useState('');

  const handleSelectPlayer = (playerId, playerName) => {
    setSelectedPlayerId(playerId);
    setSelectedPlayerName(playerName);
  };

  return (
    <div>
      <h1>NBA API Project</h1>
      <PlayerList onSelectPlayer={handleSelectPlayer} />
      {selectedPlayerId && (
        <PlayerDetails playerId={selectedPlayerId} playerName={selectedPlayerName} />
      )}
    </div>
  );
}

export default App;
