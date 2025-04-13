import Match from "./Match";
import { useState, useEffect } from "react";

function Schedule({ scheduleFromSheet }) {
  // State management
  const [matches, setMatches] = useState([]);
  const [filters, setFilters] = useState({
    team: "all",
    field: "all",
    day: "all",
    division: "all",
    time: "all",
    game: "all",
  });
  const [favoriteTeams, setFavoriteTeams] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showHelperTooltip, setShowHelperTooltip] = useState(true);

  // Extract unique values for filter options
  const fields = [
    ...new Set(matches.map((match) => match.field).filter(Boolean)),
  ];
  const times = [
    ...new Set(
      matches
        .filter((match) => match.time && match.time.substring(3, 5) === "00")
        .map((match) => match.time.substring(0, 5)),
    ),
  ];

  // Load data and saved preferences
  useEffect(() => {
    // Set matches from props
    setMatches(scheduleFromSheet.scheduleFromSheet);

    // Load saved filters from localStorage
    const savedFilters = ["team", "field", "day", "division", "time", "game"];
    const newFilters = { ...filters };

    savedFilters.forEach((filter) => {
      const savedValue = localStorage.getItem(`${filter}Filter`);
      if (savedValue && savedValue !== "all") {
        newFilters[filter] = savedValue;
      }
    });

    setFilters(newFilters);

    // Load favorite teams and display preference
    const savedFavoriteTeams = localStorage.getItem("favoriteTeams");
    if (savedFavoriteTeams) {
      setFavoriteTeams(JSON.parse(savedFavoriteTeams));
    }

    const savedShowFavoritesOnly = localStorage.getItem("showFavoritesOnly");
    if (savedShowFavoritesOnly) {
      setShowFavoritesOnly(JSON.parse(savedShowFavoritesOnly));
    }

    // Check if user has seen the helper tooltip
    const hasSeenTooltip = localStorage.getItem("hasSeenFavoriteTooltip");
    if (hasSeenTooltip) {
      setShowHelperTooltip(false);
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    Object.entries(filters).forEach(([key, value]) => {
      localStorage.setItem(`${key}Filter`, value);
    });
    localStorage.setItem(
      "showFavoritesOnly",
      JSON.stringify(showFavoritesOnly),
    );
  }, [filters, showFavoritesOnly]);

  useEffect(() => {
    localStorage.setItem("favoriteTeams", JSON.stringify(favoriteTeams));
  }, [favoriteTeams]);

  // Helper functions
  const updateFilter = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFavoriteTeam = (teamName) => {
    setFavoriteTeams((prev) =>
      prev.includes(teamName)
        ? prev.filter((team) => team !== teamName)
        : [...prev, teamName],
    );
  };

  const clearFilters = () => {
    setFilters({
      team: "all",
      field: "all",
      day: "all",
      division: "all",
      time: "all",
      game: "all",
    });
    setShowFavoritesOnly(false);
    setShowFilters(false);
  };

  // Function to dismiss tooltip
  const dismissTooltip = () => {
    localStorage.setItem("hasSeenFavoriteTooltip", "true");
    setShowHelperTooltip(false);
  };

  // Get active filter count for the badge
  const getActiveFilterCount = () => {
    return (
      Object.values(filters).filter((value) => value !== "all").length +
      (showFavoritesOnly ? 1 : 0)
    );
  };

  // Filter matches based on current filters
  const filteredMatches = matches.filter((match) => {
    if (
      !match.team1 ||
      !match.team2 ||
      match.team1 === '""' ||
      match.team2 === '""'
    ) {
      return false;
    }

    const team1 = match.team1.replace(/['"]+/g, "");
    const team2 = match.team2.replace(/['"]+/g, "");

    // Check favorites filter
    if (
      showFavoritesOnly &&
      !favoriteTeams.includes(team1) &&
      !favoriteTeams.includes(team2)
    ) {
      return false;
    }

    // Apply other filters
    return (
      (filters.team === "all" ||
        match.team1.toLowerCase().includes(filters.team) ||
        match.team2.toLowerCase().includes(filters.team)) &&
      (filters.field === "all" ||
        match.field.toLowerCase() === filters.field) &&
      (filters.day === "all" ||
        match.day.toLowerCase().includes(filters.day)) &&
      (filters.division === "all" ||
        !match.division ||
        match.division.toLowerCase().substring(0, 2) === filters.division) &&
      (filters.time === "all" ||
        (match.time &&
          match.time.toLowerCase().substring(0, 3) ===
            filters.time.substring(0, 3))) &&
      (filters.game === "all" ||
        (filters.game === "played" ? match.team1Score : !match.team1Score))
    );
  });

  return (
    <div className="schedule">
      <div className="filter-header">
        <div className="search-compact">
          <input
            className="search-bar"
            type="text"
            placeholder="Search team..."
            value={filters.team === "all" ? "" : filters.team}
            onChange={(e) =>
              updateFilter("team", e.target.value.toLowerCase() || "all")
            }
          />
          <button
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span>Filters</span>
            {getActiveFilterCount() > 0 && (
              <span className="filter-badge">{getActiveFilterCount()}</span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="filters-dropdown">
            <div className="filter-grid">
              <div className="filter-item">
                <label>Division</label>
                <select
                  value={filters.division}
                  onChange={(e) => updateFilter("division", e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="rm">REAL MIXED</option>
                  <option value="lm">LOOSE MIXED</option>
                  <option value="o ">OPEN</option>
                  <option value="w ">WOMEN</option>
                  <option value="u2">U20</option>
                  <option value="u1">U15</option>
                </select>
              </div>

              <div className="filter-item">
                <label>Field</label>
                <select
                  value={filters.field}
                  onChange={(e) => updateFilter("field", e.target.value)}
                >
                  <option value="all">All</option>
                  {fields.map((field, index) => (
                    <option key={index} value={field.toLowerCase()}>
                      {field}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-item">
                <label>Day</label>
                <select
                  value={filters.day}
                  onChange={(e) => updateFilter("day", e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                  <option value="monday">Monday</option>
                </select>
              </div>

              <div className="filter-item">
                <label>Time</label>
                <select
                  value={filters.time}
                  onChange={(e) => updateFilter("time", e.target.value)}
                >
                  <option value="all">All</option>
                  {times.map((time, index) => (
                    <option key={index} value={time.toLowerCase()}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-item">
                <label>Status</label>
                <select
                  value={filters.game}
                  onChange={(e) => updateFilter("game", e.target.value)}
                >
                  <option value="all">All Games</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="played">Played</option>
                </select>
              </div>

              <div className="filter-item favorites-toggle">
                <label>
                  <input
                    type="checkbox"
                    checked={showFavoritesOnly}
                    onChange={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  />
                  <span>Favorites Only</span>
                </label>
              </div>
            </div>

            <div className="filter-actions">
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear All Filters
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="apply-filters-btn"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      {showHelperTooltip && (
        <div className="helper-tooltip">
          <p>
            Click the ☆ icon next to a team name to add it to your favorites
          </p>
          <button onClick={dismissTooltip}>Got it</button>
        </div>
      )}

      {favoriteTeams.length > 0 && (
        <div className="favorite-teams">
          <div className="favorite-header">
            <h3>Your Favorite Teams</h3>
            <button
              className={`toggle-favorites-btn ${showFavoritesOnly ? "active" : ""}`}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              {showFavoritesOnly ? "Show All Matches" : "Show Only Favorites"}
            </button>
          </div>
          <div className="favorite-teams-list">
            {favoriteTeams.map((team, index) => (
              <div key={index} className="favorite-team-tag">
                <span className="favorite-star">★</span>
                {team}
                <button
                  onClick={() => toggleFavoriteTeam(team)}
                  title="Remove from favorites"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="matches-list">
        {filteredMatches.length === 0 ? (
          <div className="no-matches">
            No matches found with the current filters.
          </div>
        ) : (
          filteredMatches.map((match) => {
            const team1 = match.team1.replace(/['"]+/g, "");
            const team2 = match.team2.replace(/['"]+/g, "");
            const isTeam1Favorite = favoriteTeams.includes(team1);
            const isTeam2Favorite = favoriteTeams.includes(team2);
            const matchKey = `${match.field.replace(/\s+/g, "")}-${match.time?.substring(0, 2) || "00"}-${match.day}`;

            return (
              <div key={matchKey} className="match-container">
                <Match
                  team1={team1}
                  team1Nation={match.team1Nation?.replace(/['"]+/g, "")}
                  team2={team2}
                  team2Nation={match.team2Nation?.replace(/['"]+/g, "")}
                  field={match.field}
                  time={match.time}
                  day={match.day}
                  division={match.division}
                  team1Score={match.team1Score}
                  team2Score={match.team2Score}
                  isTeam1Favorite={isTeam1Favorite}
                  isTeam2Favorite={isTeam2Favorite}
                  onToggleFavorite={toggleFavoriteTeam}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Schedule;
