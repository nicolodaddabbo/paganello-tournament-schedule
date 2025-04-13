import { google } from 'googleapis';

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
    constructor(name, rows) {
        this.name = name;
        this.rows = rows;
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
    const pools = [];

    for (const sheetName of sheetNames) {
        const sheetData = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: `${sheetName}!A1:V214`,
        }).catch(error => {
            throw new Error(`spreadsheets.values.get() error for ${sheetName}: ${error}`);
        });

        const rawData = sheetData.data.values;

        for (let i = 0; i < rawData.length; i++) {
            const row = rawData[i];
            if (row[1] && row[1].startsWith('POOL')) {
                const poolNameLeft = row[1];
                const poolNameRight = row[13]; // Handle the second pool in the same row
                const poolRowsLeft = [];
                const poolRowsRight = [];
                for (let j = i + 3; j < rawData.length; j++) {
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
                pools.push(new Pool(poolNameLeft, poolRowsLeft));
                if (poolNameRight) {
                    pools.push(new Pool(poolNameRight, poolRowsRight));
                }
            }
        }
    }

    return {
        props: {
            pools: pools.map(pool => ({
                name: pool.name,
                rows: pool.rows.map(row => ({
                    team: row.team,
                    pt: row.pt,
                    w: row.w,
                    l: row.l,
                    p: row.p,
                    gs: row.gs,
                    ga: row.ga,
                    gd: row.gd
                }))
            }))
        },
        // Revalidate every 5 minutes
        revalidate: 300
    };
}

// Component to display a single pool table
const PoolTable = ({ pool }) => {
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
                    {pool.rows.map((row, index) => (
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

export default function PoolsPage({ pools }) {
    return (
        <div className="pools-page">
            <h1>Tournament Pools</h1>
            
            <div className="pools-grid">
                {pools.map((pool) => (
                    <PoolTable key={pool.name} pool={pool} />
                ))}
            </div>

            <style jsx>{`
                .pools-page {
                    padding: 20px;
                    font-family: sans-serif;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                h1 {
                    color: #333;
                    text-align: center;
                    margin-bottom: 40px;
                }
                
                .pools-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    grid-gap: 30px;
                }
                
                .pool-container {
                    background-color: #f9f9f9;
                    border-radius: 10px;
                    padding: 20px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                
                .pool-title {
                    text-align: center;
                    margin-bottom: 20px;
                    color: #2c5282;
                    font-size: 24px;
                    font-weight: bold;
                }
                
                .pool-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .pool-table th, .pool-table td {
                    padding: 12px 8px;
                    text-align: center;
                    border-bottom: 1px solid #e2e8f0;
                }
                
                .pool-table th {
                    background-color: #4299e1;
                    color: white;
                    font-weight: bold;
                }
                
                .pool-table tr:nth-child(even) {
                    background-color: #f0f4f8;
                }
                
                .pool-table tr:hover {
                    background-color: #e6f1ff;
                }
                
                @media (max-width: 768px) {
                    .pools-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}