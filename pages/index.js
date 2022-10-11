import App from './App';
import { google } from 'googleapis';

class Match {
  constructor(field, time, division, team1, team2, team1Score, team2Score, day) {
    this.field = field;
    this.time = time;
    this.division = division;
    this.team1 = team1;
    this.team2 = team2;
    this.team1Score = team1Score;
    this.team2Score = team2Score;
    this.day = day;
  }
}

export async function getStaticProps() {

  // const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

  // const sheets = google.sheets({ version: 'v4', auth });

  const auth = new google.auth.GoogleAuth({
    keyFile: 'secrets.json',
    scopes: "https://www.googleapis.com/auth/spreadsheets"
  })

  const client = await auth.getClient().catch(error => {
    throw new Error(`getClient() error ${error}`)
  })

  const sheets = google.sheets({ version: 'v4', auth: client });

  const scheduleResSaturday = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Saturday!A4:AK34',
  }).catch(error => {
    throw new Error(`spreadsheets.values.get() error ${error}`)
  })

  const scheduleResSunday = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Sunday!A4:AK34',
  }).catch(error => {
    throw new Error(`spreadsheets.values.get() error ${error}`)
  })

  const scheduleResMonday = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Monday!A4:AK25',
  }).catch(error => {
    throw new Error(`spreadsheets.values.get() error ${error}`)
  })

  const scheduleSaturday = scheduleResSaturday.data
  const scheduleSunday = scheduleResSunday.data
  const scheduleMonday = scheduleResMonday.data

  return {
    props: {
      scheduleSaturday,
      scheduleSunday,
      scheduleMonday
    },
    revalidate: 60 * 5,
  }
}

export default function Home({ scheduleSaturday, scheduleSunday, scheduleMonday }) {

  let matches = []
  let matchRes
  let i = 3
  let colCounter = 0
  let team1, team2

  // SATURDAY

  do {
    matchRes = [scheduleSaturday.values[0], scheduleSaturday.values[i - 2], scheduleSaturday.values[i - 1], scheduleSaturday.values[i]]

    colCounter = 0
    do {
      team1 = JSON.stringify(matchRes[2][1 + colCounter])
      team2 = JSON.stringify(matchRes[3][1 + colCounter])

      matches.push(new Match(matchRes[0][1 + colCounter], matchRes[1][0], matchRes[1][1 + colCounter], team1, team2, matchRes[2][2 + colCounter], matchRes[3][2 + colCounter], "Saturday"))

      colCounter += 2
    } while (colCounter < matchRes[0].length)
    i += 3;
  } while (i < scheduleSaturday.values.length)

  // SUNDAY

  i = 3
  colCounter = 0

  do {
    matchRes = [scheduleSunday.values[0], scheduleSunday.values[i - 2], scheduleSunday.values[i - 1], scheduleSunday.values[i]]
    
    colCounter = 0
    do {
      team1 = JSON.stringify(matchRes[2][1 + colCounter])
      team2 = JSON.stringify(matchRes[3][1 + colCounter])
      matches.push(new Match(matchRes[0][1 + colCounter], matchRes[1][0], matchRes[1][1 + colCounter], team1, team2, matchRes[2][2 + colCounter], matchRes[3][2 + colCounter], "Sunday"))
      colCounter += 2
    } while (colCounter < matchRes[0].length)
    i += 3;
  } while (i < scheduleSunday.values.length)

  // MONDAY

  i = 3
  colCounter = 0

  do {
    matchRes = [scheduleMonday.values[0], scheduleMonday.values[i - 2], scheduleMonday.values[i - 1], scheduleMonday.values[i]]
    
    colCounter = 0
    do {
      team1 = JSON.stringify(matchRes[2][1 + colCounter])
      team2 = JSON.stringify(matchRes[3][1 + colCounter])
      matches.push(new Match(matchRes[0][1 + colCounter], matchRes[1][0], matchRes[1][1 + colCounter], team1, team2, matchRes[2][2 + colCounter], matchRes[3][2 + colCounter], "Monday"))
      colCounter += 2
    } while (colCounter < matchRes[0].length)
    i += 3;
  } while (i < scheduleMonday.values.length)

  return (
    <App scheduleFromSheet={matches} />
  )
}
