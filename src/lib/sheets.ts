import { google } from 'googleapis';

export async function getLeagueData() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const ranges = [
      "'Leaderboard'!A1:AK9",    
      "'Core_Roster'!A2:K15",   
      "'OAD'!A1:DJ69",  
      "'Filtered'!A1:G150",
      "'Tournament_Config'!H13",
      "'Individual'!H1:L25"
    ];

    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      ranges,
    });

    return response.data.valueRanges || [];
  } catch (err) {
    console.error('Google API Error:', err);
    return null;
  }
}

export function transformSheetData(valueRanges: any[]) {
  // Check for 6 ranges now
  if (!valueRanges || valueRanges.length < 6) {
    console.error("Missing expected sheet ranges");
    return { leaderboard: [], core: [], oad: [], filtered: [], tournamentName: "", individualPlayers: [] };
  }
  const individualRows = valueRanges[5].values || [];
    const individualPlayers = individualRows.slice(1).map((row: any) => ({
      name: row[1] || "Unknown Player", // Column I: Player Name
      owner: row[0] || "Unassigned",    // Column H: Owner Name
      starts: row[2] || "0",            // Column J: Starts
      cutPct: row[3] || "0%",           // Column K: Cut %
      earnings: Number(row[4]?.replace(/[^0-9.-]+/g, "")) || 0, // Column L: Earnings
    }));

    // Sort by earnings immediately so the Rank (idx + 1) is accurate
    const sortedIndividuals = individualPlayers.sort((a: any, b: any) => b.earnings - a.earnings);

  return {
    leaderboard: valueRanges[0].values || [],
    core: valueRanges[1].values || [],
    oad: valueRanges[2].values || [], 
    filtered: valueRanges[3].values || [],
    tournamentName: valueRanges[4].values?.[0]?.[0] || "Tournament Loading...",
    individualPlayers: sortedIndividuals
  };
}