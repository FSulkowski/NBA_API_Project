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
    GS = db.Column(db.Integer)  # Games started

    PPG = db.Column(db.Float)  # Points per game
    RPG = db.Column(db.Float)  # Rebounds per game
    APG = db.Column(db.Float)  # Assists per game
    SPG = db.Column(db.Float)  # Steals per game
    BPG = db.Column(db.Float)  # Blocks per game
    MPG = db.Column(db.Float)  # Minutes per game

    FG_PCT = db.Column(db.Float)  # Field goal percentage
    FG3_PCT = db.Column(db.Float)  # Three-point field goal percentage
    FT_PCT = db.Column(db.Float)  # Free throw percentage

    TS_PCT = db.Column(db.Float)  # True shooting percentage
    PER = db.Column(db.Float)  # Player efficiency rating

