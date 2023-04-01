// Componente del singolo match

const Match = ({ team1, team2, field, time, day, division, team1Score, team2Score }) => {

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
                <div className="col center">
                </div>
                <div className="col right">
                    <div className="content info">
                        <div className="field">
                            {field}
                        </div>
                    </div>
                </div>
            </div>
            <div className={"row teams-names-container" + (team1Score ? " with-score" : "")}>
                <div className="col left team">
                    <div className="team-and-score">
                        <p className="content team-name">{team1}</p>
                        <p className="score">{team1Score}</p>
                    </div>
                </div>
                <div className="col center">
                    <p className="content vs">VS</p>
                </div>
                <div className="col right team">
                    <div className="team-and-score">
                        <p className="content team-name">{team2}</p>
                        <p className="score">{team2Score}</p>
                    </div>
                </div>
            </div>
            <div className="row match-division-container">
                <div className="col left"></div>
                <div className="col center">
                    <div className="content info">
                        {division}
                    </div>
                </div>
                <div className="col right"></div>
            </div>
        </div>
    )
}

export default Match