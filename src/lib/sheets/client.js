import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const SHEET_ID = import.meta.env.GOOGLE_SHEET_ID;
const CLIENT_EMAIL = import.meta.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const PRIVATE_KEY = import.meta.env.GOOGLE_SHEETS_PRIVATE_KEY;
const SHEET_NAME = import.meta.env.GOOGLE_SHEET_NAME || 'Sheet1';

// Define headers for the sheet
const HEADERS = [
  'Position',
  'Company',
  'Location',
  'Job ID',
  'Applicant Name',
  'Email Address',
  'Phone',
  'LinkedIn',
  'Cover Letter',
  'Date Applied',
  'Status',
  'Resend Email ID'
];

function debugEnvVars() {
  console.log('Environment Variables:', {
    SHEET_ID: SHEET_ID ? 'Loaded' : 'Missing',
    CLIENT_EMAIL: CLIENT_EMAIL ? 'Loaded' : 'Missing',
    PRIVATE_KEY: PRIVATE_KEY ? 'Loaded' : 'Missing',
    SHEET_NAME: SHEET_NAME,  // Actually show the sheet name
    SHEET_ID_VALUE: SHEET_ID // Show the actual sheet ID
  });
}

export async function getSheet() {
  try {
    debugEnvVars();

    if (!SHEET_ID) throw new Error('Missing GOOGLE_SHEET_ID environment variable');
    if (!CLIENT_EMAIL) throw new Error('Missing GOOGLE_SHEETS_CLIENT_EMAIL environment variable');
    if (!PRIVATE_KEY) throw new Error('Missing GOOGLE_SHEETS_PRIVATE_KEY environment variable');

    // Create a new JWT client directly
    const client = new JWT({
      email: CLIENT_EMAIL,
      key: PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Initialize the sheets API
    const sheets = google.sheets({ version: 'v4', auth: client });

    // First, get the spreadsheet to see all available sheets
    try {
      await client.authorize();
      
      console.log('Getting spreadsheet info...');
      const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId: SHEET_ID
      });
      
      console.log('Available sheets:', spreadsheet.data.sheets.map(sheet => ({
        title: sheet.properties.title,
        sheetId: sheet.properties.sheetId
      })));

      // Try to read the headers
      console.log(`Attempting to read headers from sheet: ${SHEET_NAME}`);
      const headerResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: `'${SHEET_NAME}'!A1:L1`  // Note the added single quotes around sheet name
      });

      // If no headers exist, add them
      if (!headerResponse.data.values || headerResponse.data.values.length === 0) {
        console.log('No headers found, adding them...');
        await sheets.spreadsheets.values.update({
          spreadsheetId: SHEET_ID,
          range: `'${SHEET_NAME}'!A1:L1`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [HEADERS]
          }
        });
      }
    } catch (error) {
      console.error('Spreadsheet access error:', {
        message: error.message,
        response: error.response?.data
      });
      throw new Error(`Could not access or setup spreadsheet: ${error.message}`);
    }

    return {
      async addRow(rowData) {
        if (!rowData || typeof rowData !== 'object') {
          throw new Error('Invalid rowData: Must be a non-empty object');
        }

        // Required fields that must have values
        const requiredFields = [
          'Position',
          'Company',
          'Location',
          'Job ID',
          'Applicant Name',
          'Email Address',
          'Phone',
          'Date Applied',
          'Status',
          'Resend Email ID'
        ];

        // Optional fields that can be blank
        const optionalFields = ['LinkedIn', 'Cover Letter'];

        const missingFields = requiredFields.filter(field => !(field in rowData));
        if (missingFields.length > 0) {
          throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        // Ensure optional fields exist (even if blank)
        const fullRowData = {
          ...rowData,
          ...Object.fromEntries(optionalFields.map(field => [field, rowData[field] || '']))
        };

        try {
          const values = [Object.values(fullRowData)];
          console.log('Attempting to append row with values:', {
            numFields: values[0].length,
            fields: Object.keys(fullRowData),
            sheetName: SHEET_NAME
          });

          // Append the data after the headers
          const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SHEET_ID,
            range: `'${SHEET_NAME}'!A2:L`,  // Note the added single quotes around sheet name
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
            requestBody: {
              values,
            },
          });

          const updatedRows = response.data.updates?.updatedRows || 0;
          console.log('Row added successfully:', updatedRows);
          return {
            success: true,
            rowsUpdated: updatedRows,
            message: `Successfully added ${updatedRows} row(s) to the sheet`
          };
        } catch (error) {
          console.error('Error adding row to Google Sheets:', {
            message: error.message,
            stack: error.stack,
            response: error.response?.data
          });
          throw new Error(`Failed to add row to Google Sheets: ${error.message}`);
        }
      }
    };
  } catch (error) {
    console.error('Error connecting to Google Sheets:', {
      message: error.message,
      stack: error.stack
    });
    throw new Error(`Failed to connect to Google Sheets: ${error.message}`);
  }
} 