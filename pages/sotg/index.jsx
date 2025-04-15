import React from "react";
import Navbar from "../../components/Navbar";

export default function SotgPage() {
    const divisionForms = {
        "Real Mixed": "https://docs.google.com/forms/d/e/1FAIpQLSdH0bzusyOoYE4WXTcCbAmjND9NnT9XkVS2pT7qY1DPkI7jlw/viewform?",
        "Loose Mixed": "https://docs.google.com/forms/d/e/1FAIpQLSfi6vZg_VgvDnlHmHr8wdIYYKQHJ8-SfqMy7qamkXMwM1Ot7Q/viewform?",
        "Open": "https://docs.google.com/forms/d/e/1FAIpQLSfS2BHeCkI4aN8N792ZHLp_FEruToNTEaMX8fW2krzwD_lxAg/viewform?",
        "Women": "https://docs.google.com/forms/d/e/1FAIpQLSfKwxSLHoEzxiEs92o7FNxx2e2PegSgPCATGB-3pSqbDY9-fw/viewform?",
        "U20": "https://docs.google.com/forms/d/e/1FAIpQLSdvjHMSzw6oLTc9NLiVeWu6zKZKR3Isz3xblUon8c7ALLTcsA/viewform?",
        "U15": "https://docs.google.com/forms/d/e/1FAIpQLSfHRzGEFdnHqHO_mjwUJMI5dZTxYTap4GMVL5K0cQg8kOLmww/viewform?",
    };

    return (
        <div>
            <Navbar
                title="SOTG"
                buttonText="Schedule"
                buttonHref="/"
            />
            <div className="schedule">
                <div className="sotg-container">
                    <div className="section-header">
                        <h2>Spirit of the Game</h2>
                        <p>Select a division to submit spirit scores</p>
                    </div>

                    <div className="division-grid">
                        {Object.entries(divisionForms).map(([division, formUrl]) => (
                            <div key={division} className="division-card">
                                <h3>{division}</h3>
                                <div className="button-group">
                                    {/* <a
                                        className="card-button view-button"
                                        href={`/sotg/${division.toLowerCase().replace(' ', '-')}/view`}
                                    >
                                        View Scores
                                    </a> */}
                                    <a
                                        className="card-button submit-button"
                                        href={formUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Submit Score
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
