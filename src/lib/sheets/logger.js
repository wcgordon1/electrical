import { getSheet } from './client';

export async function logEmailSent({ 
  // Job Details
  position = '',
  company = '',
  location = '',
  jobId = '',
  
  // Applicant Details
  applicantName = '',
  email = '',
  phone = '',
  linkedin = '',
  coverLetter = '',
  
  // Email Details
  resendEmailId = ''
}) {
  try {
    console.log('Starting to log application to Google Sheets...');
    
    // Validate required fields
    if (!position || !company || !location || !jobId || !applicantName || !email || !phone || !resendEmailId) {
      console.error('Missing required fields:', {
        position: !!position,
        company: !!company,
        location: !!location,
        jobId: !!jobId,
        applicantName: !!applicantName,
        email: !!email,
        phone: !!phone,
        resendEmailId: !!resendEmailId
      });
      throw new Error('Missing required fields for logging application');
    }

    const sheet = await getSheet();
    
    console.log('Sheet connection established, adding row...');

    // Add a new row to the sheet with the exact field names expected by client.js
    await sheet.addRow({
      'Position': position,
      'Company': company,
      'Location': location,
      'Job ID': jobId,
      'Applicant Name': applicantName,
      'Email Address': email,
      'Phone': phone,
      'LinkedIn': linkedin || '',
      'Cover Letter': coverLetter || '',
      'Date Applied': new Date().toISOString(),
      'Status': 'Application Sent',
      'Resend Email ID': resendEmailId
    });

    console.log('Successfully logged application to Google Sheets');
    return true;
  } catch (error) {
    console.error('Error logging application:', {
      message: error.message,
      stack: error.stack,
      data: {
        position,
        company,
        location,
        jobId,
        applicantName: applicantName ? 'provided' : 'missing',
        email: email ? 'provided' : 'missing',
        phone: phone ? 'provided' : 'missing',
        resendEmailId: resendEmailId ? 'provided' : 'missing'
      }
    });
    // Don't throw error - we don't want to break email sending if logging fails
    return false;
  }
} 