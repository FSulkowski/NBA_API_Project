from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Player(db.Model):
    __tablename__ = 'players'

    PLAYER_ID = db.Column(db.Integer, primary_key=True)
    FIRST_NAME = db.Column(db.String)
    LAST_NAME = db.Column(db.String)
    IS_ACTIVE = db.Column(db.Boolean)

    # Define the one-to-many relationship with PlayerStats
    player_stats = db.relationship('PlayerStats', backref='player', lazy=True)

class PlayerStats(db.Model):
    __tablename__ = 'player_stats'

    STAT_ID = db.Column(db.Integer, primary_key=True)
    PLAYER_ID = db.Column(db.Integer, db.ForeignKey('players.PLAYER_ID'), nullable=False)  # Foreign key
    SEASON_ID = db.Column(db.Integer)  # Added for season identification
    GP = db.Column(db.Integer)  # Games played
    PPG = db.Column(db.Float)  # Points per game
    RPG = db.Column(db.Float)  # Rebounds per game
    APG = db.Column(db.Float)  # Assists per game
    PTS = db.Column(db.Float)  # Points
    REB = db.Column(db.Float)  # Rebounds
    AST = db.Column(db.Float)  # Assists
    BLK = db.Column(db.Float)  # Blocks
