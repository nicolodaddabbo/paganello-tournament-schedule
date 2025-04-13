const Match = ({
  team1,
  team1Nation,
  team2,
  team2Nation,
  field,
  time,
  day,
  division,
  team1Score,
  team2Score,
  isTeam1Favorite,
  isTeam2Favorite,
  onToggleFavorite,
}) => {
  return (
    <div className="match">
      <div className="row match-info-container">
        <div className="col left">
          <div className="content info">
            <div className="day-time">
              {day} at {time}
            </div>
          </div>
        </div>
        <div className="col center"></div>
        <div className="col right">
          <div className="content info">
            <div className="field">{field}</div>
          </div>
        </div>
      </div>
      <div
        className={
          "row teams-names-container" + (team1Score ? " with-score" : "")
        }
      >
        <div className="col left team">
          <div className="team-and-score">
            <div className="team-with-favorite">
              <button
                className={`favorite-icon ${isTeam1Favorite ? "favorite" : ""}`}
                onClick={() => onToggleFavorite(team1)}
                title={
                  isTeam1Favorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                {isTeam1Favorite ? "★" : "☆"}
              </button>
              <p className="content team-name">
                {team1Nation} {team1}
              </p>
            </div>
            <p className="score">{team1Score}</p>
          </div>
        </div>
        <div className="col center">
          <p className="content vs">VS</p>
        </div>
        <div className="col right team">
          <div className="team-and-score">
            <div className="team-with-favorite">
              <button
                className={`favorite-icon ${isTeam2Favorite ? "favorite" : ""}`}
                onClick={() => onToggleFavorite(team2)}
                title={
                  isTeam2Favorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                {isTeam2Favorite ? "★" : "☆"}
              </button>
              <p className="content team-name">
                {team2Nation} {team2}
              </p>
            </div>
            <p className="score">{team2Score}</p>
          </div>
        </div>
      </div>
      <div className="row match-division-container">
        <div className="col left"></div>
        <div className="col center">
          <div className="content info">{division}</div>
        </div>
        <div className="col right"></div>
      </div>
    </div>
  );
};

export default Match;

