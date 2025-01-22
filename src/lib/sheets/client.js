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

function formatPrivateKey(key) {
  try {
    console.log('Starting private key formatting...');
    // Remove any existing quotes and spaces
    let cleanKey = key.replace(/"|'|\s/g, '');
    
    // Add spaces in the header and footer if they're missing
    cleanKey = cleanKey
      .replace('-----BEGINPRIVATEKEY-----', '-----BEGIN PRIVATE KEY-----')
      .replace('-----ENDPRIVATEKEY-----', '-----END PRIVATE KEY-----');
    
    // Split into lines and ensure proper formatting
    const keyContent = cleanKey
      .replace('-----BEGIN PRIVATE KEY-----', '')
      .replace('-----END PRIVATE KEY-----', '');
      
    // Format the key with proper line breaks
    const formattedKey = [
      '-----BEGIN PRIVATE KEY-----',
      ...keyContent.match(/.{1,64}/g) || [],
      '-----END PRIVATE KEY-----'
    ].join('\n');

    console.log('Private key formatting completed:', {
      originalLength: key.length,
      formattedLength: formattedKey.length,
      hasCorrectHeader: formattedKey.startsWith('-----BEGIN PRIVATE KEY-----'),
      hasCorrectFooter: formattedKey.endsWith('-----END PRIVATE KEY-----'),
      lineCount: formattedKey.split('\n').length
    });

    return formattedKey;
  } catch (error) {
    console.error('Error formatting private key:', {
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
}

function debugEnvVars() {
  // Add production-safe debugging
  console.log('Environment Check:', {
    SHEET_ID_LENGTH: SHEET_ID?.length || 0,
    CLIENT_EMAIL_SET: !!CLIENT_EMAIL,
    PRIVATE_KEY_SET: !!PRIVATE_KEY,
    PRIVATE_KEY_LENGTH: PRIVATE_KEY?.length || 0,
    PRIVATE_KEY_VALID: PRIVATE_KEY?.includes('PRIVATE KEY'),
    SHEET_NAME: SHEET_NAME
  });
}

export async function getSheet() {
  try {
    console.log('Starting Google Sheets connection...');
    debugEnvVars();

    if (!SHEET_ID) throw new Error('Missing GOOGLE_SHEET_ID environment variable');
    if (!CLIENT_EMAIL) throw new Error('Missing GOOGLE_SHEETS_CLIENT_EMAIL environment variable');
    if (!PRIVATE_KEY) throw new Error('Missing GOOGLE_SHEETS_PRIVATE_KEY environment variable');

    const formattedKey = formatPrivateKey(PRIVATE_KEY);

    // Log key format check
    console.log('Key format check:', {
      hasHeader: formattedKey.includes('-----BEGIN PRIVATE KEY-----'),
      hasFooter: formattedKey.includes('-----END PRIVATE KEY-----'),
      hasActualNewlines: formattedKey.includes('\n'),
      length: formattedKey.length,
      firstLine: formattedKey.split('\n')[0],
      lastLine: formattedKey.split('\n').slice(-1)[0]
    });

    console.log('Creating JWT client...');
    // Create a new JWT client directly
    const client = new JWT({
      email: CLIENT_EMAIL,
      key: formattedKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Initialize the sheets API
    const sheets = google.sheets({ version: 'v4', auth: client });

    // First, get the spreadsheet to see all available sheets
    try {
      console.log('Starting client authorization...');
      try {
        await client.authorize();
        console.log('Google client authorized successfully');
      } catch (authError) {
        console.error('Error authorizing Google client:', {
          message: authError.message,
          stack: authError.stack,
          details: authError.response?.data,
          code: authError.code,
          statusCode: authError.response?.status
        });
        throw authError;
      }
      
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
        range: `'${SHEET_NAME}'!A1:L1`
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
      } else {
        console.log('Headers found:', headerResponse.data.values[0]);
      }
    } catch (error) {
      console.error('Spreadsheet access error:', {
        message: error.message,
        response: error.response?.data,
        stack: error.stack,
        code: error.code,
        statusCode: error.response?.status
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
          console.log('Attempting to append row...');
          const values = [Object.values(fullRowData)];
          console.log('Row data prepared:', {
            numFields: values[0].length,
            fields: Object.keys(fullRowData),
            sheetName: SHEET_NAME
          });

          // Append the data after the headers
          const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SHEET_ID,
            range: `'${SHEET_NAME}'!A2:L`,
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
            response: error.response?.data,
            code: error.code,
            statusCode: error.response?.status
          });
          throw new Error(`Failed to add row to Google Sheets: ${error.message}`);
        }
      }
    };
  } catch (error) {
    console.error('Error connecting to Google Sheets:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      statusCode: error.response?.status
    });
    throw new Error(`Failed to connect to Google Sheets: ${error.message}`);
  }
} 