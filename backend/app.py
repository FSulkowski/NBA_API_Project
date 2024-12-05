from flask import Flask, jsonify, request
from models import db, Player, PlayerStats
import numpy as np
from sklearn.linear_model import LinearRegression

# Initialize Flask app
app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://francis:1234@localhost/nba_db'
db.init_app(app)

# Endpoint to get all players, including their stats
@app.route('/players', methods=['GET'])
def get_players():
    players = Player.query.all()
    player_list = []

    for player in players:
        # Create a dictionary to hold the best stats for each season
        best_seasons = {}
        
        # Iterate through player stats to select the best season based on GP
        for stat in player.player_stats:
            if stat.SEASON_ID not in best_seasons or stat.GP > best_seasons[stat.SEASON_ID]['gp']:
                best_seasons[stat.SEASON_ID] = {
                    'season_id': stat.SEASON_ID,
                    'gp': stat.GP,
                    'ppg': round(stat.PPG, 1),
                    'rpg': round(stat.RPG, 1),
                    'apg': round(stat.APG, 1),
                    'pts': stat.PTS,
                    'reb': stat.REB,
                    'ast': stat.AST,
                    'blk': stat.BLK
                }
        
        # Add the player data with the filtered stats
        player_list.append({
            'id': player.PLAYER_ID,
            'first_name': player.FIRST_NAME,
            'last_name': player.LAST_NAME,
            'is_active': player.IS_ACTIVE,
            'player_stats': list(best_seasons.values())  # Include the best season stats
        })
    
    return jsonify(player_list)

# Endpoint to get player stats by player ID
@app.route('/player_stats/<int:player_id>', methods=['GET'])
def get_player_stats(player_id):
    stats = PlayerStats.query.filter_by(PLAYER_ID=player_id).all()

    # Create a dictionary to hold the best stats for each season
    best_seasons = {}
    
    # Iterate through stats to select the best season based on GP
    for stat in stats:
        if stat.SEASON_ID not in best_seasons or stat.GP > best_seasons[stat.SEASON_ID]['gp']:
            best_seasons[stat.SEASON_ID] = {
                'season_id': stat.SEASON_ID,
                'gp': stat.GP,
                'ppg': round(stat.PPG, 1),
                'rpg': round(stat.RPG, 1),
                'apg': round(stat.APG, 1),
                'pts': stat.PTS,
                'reb': stat.REB,
                'ast': stat.AST,
                'blk': stat.BLK
            }
    
    # Return only the best season stats for the player
    stat_list = list(best_seasons.values())
    return jsonify(stat_list)




# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)