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
    const sheet = await getSheet();
    
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

    return true;
  } catch (error) {
    console.error('Error logging application:', error);
    // Don't throw error - we don't want to break email sending if logging fails
    return false;
  }
} 