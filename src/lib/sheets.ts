import { google, oracledatabase_v1 } from 'googleapis';

// This handles the connection to Google
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
      "'Core_Roster'!A2:K9",   
      "'OAD'!A1:DJ69",  
      "'Filtered'!A1:G150"       
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

// This handles cleaning the data
export function transformSheetData(valueRanges: any[]) {
  // Defensive check to ensure we have data
  if (!valueRanges || valueRanges.length < 4) {
    console.error("Missing expected sheet ranges");
    return { leaderboard: [], coreRoster: [], oad: [], filtered: [] };
  }

  return {
    leaderboard: valueRanges[0].values || [],
    core: valueRanges[1].values || [],
    oad: valueRanges[2].values || [], 
    filtered: valueRanges[3].values || []
  };
}