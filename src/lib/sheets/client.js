import { google } from 'googleapis';

const SHEET_ID = import.meta.env.GOOGLE_SHEET_ID;
const CLIENT_EMAIL = import.meta.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const PRIVATE_KEY = import.meta.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'); // Handle newlines
const SHEET_NAME = import.meta.env.GOOGLE_SHEET_NAME || 'Sheet1';

export async function getSheet() {
  console.log('Node.js Version:', process.version);
  console.log('OpenSSL Version:', process.versions.openssl);

  if (!SHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    throw new Error('Missing required environment variables for Google Sheets API');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: 'service_account',
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  try {
    console.log('Connecting to Google Sheets...');
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
    });

    console.log('Connected to spreadsheet:', spreadsheet.data.sheets.map(sheet => sheet.properties.title));

    return {
      async addRow(rowData) {
        if (!rowData) {
          throw new Error('Invalid rowData: Must be a non-empty object');
        }

        const values = [Object.values(rowData)];
        await sheets.spreadsheets.values.append({
          spreadsheetId: SHEET_ID,
          range: `${SHEET_NAME}!A1:L1`,
          valueInputOption: 'RAW',
          insertDataOption: 'INSERT_ROWS',
          requestBody: { values },
        });
        console.log('Row added successfully');
      },
    };
  } catch (error) {
    console.error('Error connecting to Google Sheets:', error);
    throw error;
  }
}
