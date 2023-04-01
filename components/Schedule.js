// Componente dello schedule (contiene tutti i match)

import Match from "./Match"
import { useState, useEffect } from 'react'

function Schedule(scheduleFromSheet) {
    
    let fields = []
    let divisions = []
    let times = []
    const [matches, setMatches] = useState([])
    const [teamsFilter, setTeamsFilter] = useState(["all"])
    const [fieldFilter, setFieldFilter] = useState(["all"])
    const [dayFilter, setDayFilter] = useState(["all"])
    const [divisionFilter, setDivisionFilter] = useState(["all"])
    const [timeFilter, setTimeFilter] = useState(["all"])
    const [gameFilter, setGameFilter] = useState(["all"])

    useEffect(() => {
        setMatches(scheduleFromSheet.scheduleFromSheet.scheduleFromSheet)
    }, [])
    
    function search(matches) {
        return matches.filter((match) => {
            if (match.team1 != '""' && match.team2 != '""' && match.team1 && match.team2) {
                return (teamsFilter != "all" ? (match.team1.toLowerCase().match(new RegExp(teamsFilter, 'g')) ||
                match.team2.toLowerCase().match(new RegExp(teamsFilter, 'g'))) : true) &&
                (fieldFilter != "all" ? (match.field.toLowerCase() === fieldFilter) : true) &&
                (dayFilter != "all" ? match.day.toLowerCase().match(new RegExp(dayFilter, 'g')) : true) &&
                ((divisionFilter != "all" && match.division) ? (match.division.toLowerCase().substring(0, 2) === divisionFilter) : true) &&
                (timeFilter != "all" ? (match.time.toLowerCase().substring(0,3) === timeFilter.substring(0,3)) : true) &&
                (gameFilter != "all" ? (gameFilter == "played" ? match.team1Score : !match.team1Score) : true)
            }
        })
    }
    
    matches.map((match) => (
        !fields.includes(match.field) && fields.push(match.field)
    ))
    
    matches.map((match) => (
        (!divisions.includes(match.division) && match.division) && divisions.push(match.division)
    ))

    matches.map((match) => (
        (match.time && !times.includes(match.time.substring(0,5)) && match.time.substring(3,5) == '00') && times.push(match.time.substring(0,5))
    ))
    
    return (
        <div className="schedule">
            <div className='search-filter'>
                <input className='search-bar' type='text' placeholder='Team Name...' onChange={(e) => setTeamsFilter(e.target.value.toLowerCase())} />
                <select className='search-div' onChange={(e) => setDivisionFilter(e.target.value)}>
                    <option value="all">All Divisions</option>
                    {/* {divisions.map(division => (
                        <option value={division.toLowerCase()}>{division}</option>
                        ))} */}
                    <option value="o ">OPEN</option>
                    <option value="m ">MIXED</option>
                    <option value="u2">U20</option>
                    <option value="u1">U15</option>
                </select>
                <select className='search-div' onChange={(e) => setFieldFilter(e.target.value)}>
                    <option value="all">All Fields</option>
                    {fields.map((field, index) => (
                        <option key={index} value={field.toLowerCase()}>{field}</option>
                        ))}
                </select>
                <select className='search-div' onChange={(e) => setDayFilter(e.target.value)}>
                    <option value="all">All Days</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                </select>
                <select className='search-div' onChange={(e) => setTimeFilter(e.target.value)}>
                    <option value="all">All Times</option>
                    {times.map((time, index) => (
                        <option key={index} value={time.toLowerCase()}>{time}</option>
                        ))}
                </select>
                <select className='search-div' onChange={(e) => setGameFilter(e.target.value)}>
                    <option value="all">All Games</option>
                    <option value="upcoming">Upcoming Games</option>
                    <option value="played">Played Games</option>
                </select>
            </div>
            {
                search(matches).map((match) => {
                    return match.team1 && <Match team1={match.team1.replace(/['"]+/g, '')} team2={match.team2.replace(/['"]+/g, '')} field={match.field} time={match.time} day={match.day} division={match.division} team1Score={match.team1Score} team2Score={match.team2Score} />
                })
            }
        </div>
    )
}

export default Schedule