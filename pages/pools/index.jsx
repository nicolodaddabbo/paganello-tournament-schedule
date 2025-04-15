import React, { useState } from "react";
import { google } from 'googleapis';
import Navbar from "../../components/Navbar";

class PoolRow {
    constructor(team, pt, w, l, p, gs, ga, gd) {
        this.team = team;
        this.pt = pt;
        this.w = w;
        this.l = l;
        this.p = p;
        this.gs = gs;
        this.ga = ga;
        this.gd = gd;
    }
}

class Pool {
    constructor(name, bracket, rows, rankings) {
        this.name = name;
        this.braket = bracket;
        this.rows = rows;
        this.rankings = rankings;
    }
}
export async function getStaticProps() {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'secrets.json',
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient().catch(error => {
        throw new Error(`getClient() error ${error}`);
    });

    const sheets = google.sheets({ version: 'v4', auth: client });

    const sheetNames = ['Real Mixed pools', 'Loose Mixed pools', 'Open pools', 'Women pools', 'U20 Pools', 'U15 Pools'];
    const groupedPools = {};
    let currentBracket = '';
    let currentLeftPool = '';
    let currentRightPool = '';

    for (const sheetName of sheetNames) {
        const rankings = [];
        const sheetData = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: `${sheetName}!A1:V214`,
        }).catch(error => {
            throw new Error(`spreadsheets.values.get() error for ${sheetName}: ${error}`);
        });

        const rawData = sheetData.data.values;
        const pools = [];

        for (let i = 0; i < rawData.length; i++) {
            const row = rawData[i];
            if (row[1] && row[1].startsWith('POOL')) {
                const poolNameLeft = row[1];
                currentLeftPool = poolNameLeft;
                const poolNameRight = row[13]; // Handle the second pool in the same row
                currentRightPool = poolNameRight;
                const poolRowsLeft = [];
                const poolRowsRight = [];
                for (let j = i + 4; j < rawData.length; j++) {
                    const teamRow = rawData[j];
                    if (!teamRow[1] || teamRow[1].startsWith('Ranking')) break;

                    // Left pool rows
                    if (teamRow[1]) {
                        poolRowsLeft.push(new PoolRow(
                            teamRow[1], // team
                            teamRow[3], // pt
                            teamRow[4], // w
                            teamRow[5], // l
                            teamRow[6], // p
                            teamRow[7], // gs
                            teamRow[8], // ga
                            teamRow[9]  // gd
                        ));
                    }

                    // Right pool rows
                    if (teamRow[13]) {
                        poolRowsRight.push(new PoolRow(
                            teamRow[13], // team
                            teamRow[15], // pt
                            teamRow[16], // w
                            teamRow[17], // l
                            teamRow[18], // p
                            teamRow[19], // gs
                            teamRow[20], // ga
                            teamRow[21]  // gd
                        ));
                    }
                }
                pools.push(new Pool(poolNameLeft, currentBracket, poolRowsLeft));
                if (poolNameRight) {
                    pools.push(new Pool(poolNameRight, currentBracket, poolRowsRight));
                }
            } else if (row[1] &&
                (row[1].startsWith('REAL MIXED') ||
                    row[1].startsWith('LOOSE MIXED') ||
                    row[1].startsWith('OPEN') ||
                    row[1].startsWith('WOMEN') ||
                    row[1].startsWith('U20') ||
                    row[1].startsWith('U15')
                )) {
                currentBracket = row[1].trim().replace(/^,/, '');
            } else if (row[1] && row[1].startsWith('Ranking')) {
                const rankingRowLeft = [];
                const rankingRowRight = [];
                for (let j = i + 2; j < rawData.length; j++) {
                    const rankingRow = rawData[j];
                    if (!rankingRow[1] ||
                        rankingRow[1].startsWith('POOL') ||
                        rankingRow[1].startsWith('REAL MIXED') ||
                        rankingRow[1].startsWith('LOOSE MIXED') ||
                        rankingRow[1].startsWith('OPEN') ||
                        row[1].startsWith('WOMEN') ||
                        row[1].startsWith('U20') ||
                        row[1].startsWith('U15')
                    )
                        break;

                    if (rankingRow[2]) {
                        rankingRowLeft.push(rankingRow[2]);
                    }

                    if (rankingRow[14]) {
                        rankingRowRight.push(rankingRow[14]);
                    }
                }
                rankings.push({
                    poolName: currentLeftPool,
                    rankings: rankingRowLeft
                });
                if (currentRightPool) {
                    rankings.push({
                        poolName: currentRightPool,
                        rankings: rankingRowRight
                    });
                }
            }
        }

        groupedPools[sheetName] = pools.map(pool => ({
            name: pool.name,
            bracket: pool.braket,
            rows: pool.rows.map(row => ({
                team: row.team,
                pt: row.pt,
                w: row.w,
                l: row.l,
                p: row.p,
                gs: row.gs,
                ga: row.ga,
                gd: row.gd
            })),
            rankings: rankings.find(r => r.poolName === pool.name)?.rankings || []
        }));
    }

    return {
        props: {
            groupedPools,
        },
        // Revalidate every 5 minutes
        revalidate: 300
    };
}

// Component to display a single pool table
const PoolTable = ({ pool }) => {
    const sortedRows = pool.rows.sort((a, b) => {
        const indexA = pool.rankings.indexOf(a.team);
        const indexB = pool.rankings.indexOf(b.team);
        // If both teams are not in rankings, maintain original order
        if (indexA === -1 && indexB === -1) return 0;

        // If only team A is not in rankings, place it after B
        if (indexA === -1) return 1;

        // If only team B is not in rankings, place it after A
        if (indexB === -1) return -1;

        // Otherwise sort by ranking positions
        return indexA - indexB;
    });

    return (
        <div className="pool-container">
            <h2 className="pool-title">{pool.name}</h2>
            <table className="pool-table">
                <thead>
                    <tr>
                        <th>TEAM</th>
                        <th>PT</th>
                        <th>W</th>
                        <th>L</th>
                        <th>P</th>
                        <th>GS</th>
                        <th>GA</th>
                        <th>GD</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedRows.map((row, index) => (
                        <tr key={index}>
                            <td>{row.team}</td>
                            <td>{row.pt}</td>
                            <td>{row.w}</td>
                            <td>{row.l}</td>
                            <td>{row.p}</td>
                            <td>{row.gs}</td>
                            <td>{row.ga}</td>
                            <td>{row.gd}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default function PoolsPage({ groupedPools }) {
    const [selectedSheet, setSelectedSheet] = useState(Object.keys(groupedPools)[0]);

    // Get unique brackets from the selected sheet
    const uniqueBrackets = [...new Set(groupedPools[selectedSheet]
        .map(pool => pool.bracket)
        .filter(bracket => bracket))] // Filter out empty brackets

    const [selectedBracket, setSelectedBracket] = useState(uniqueBrackets[0] || '');

    return (
        <div>
            <Navbar
                title="Standings and Pools"
                buttonText="Schedule"
                buttonHref="/"
            />

            <div className="schedule">
                <div className="filter-header pools-filters">
                    <div className="filter-item">
                        <label htmlFor="sheet-select">Division</label>
                        <select
                            id="sheet-select"
                            value={selectedSheet}
                            onChange={(e) => {
                                const newSheet = e.target.value;
                                setSelectedSheet(newSheet);
                                // When changing sheet, also update the selected bracket
                                const newUniqueBrackets = [...new Set(groupedPools[newSheet]
                                    .map(pool => pool.bracket)
                                    .filter(bracket => bracket))];
                                setSelectedBracket(newUniqueBrackets[0] || '');
                            }}
                        >
                            {Object.keys(groupedPools).map(sheetName => (
                                <option key={sheetName} value={sheetName}>
                                    {sheetName.replace(/\bpools\b/g, '')}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-item">
                        <select
                            id="bracket-select"
                            value={selectedBracket}
                            onChange={(e) => setSelectedBracket(e.target.value)}
                        >
                            {uniqueBrackets.map(bracket => (
                                <option key={bracket} value={bracket}>
                                    {bracket.replace(/^.+?\s+(\d+-\d+)$/, 'Bracket $1')}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="pools-grid">
                    {groupedPools[selectedSheet]
                        .filter(pool => pool.bracket === selectedBracket)
                        .map((pool) => (
                            <PoolTable key={pool.name} pool={pool} />
                        ))}
                </div>
            </div>
        </div>
    );
}