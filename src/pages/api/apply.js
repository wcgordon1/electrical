import { Resend } from 'resend';
import { logEmailSent } from '@/lib/sheets/logger';

export const prerender = false;

export async function POST({ request }) {
  try {
    // Add debug logging for environment variables
    console.log('API Environment Check:', {
      hasResendKey: !!import.meta.env.RESEND_API_KEY,
      hasSheetId: !!import.meta.env.GOOGLE_SHEET_ID,
      hasClientEmail: !!import.meta.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      hasPrivateKey: !!import.meta.env.GOOGLE_SHEETS_PRIVATE_KEY,
      hasSheetName: !!import.meta.env.GOOGLE_SHEET_NAME
    });

    if (!import.meta.env.RESEND_API_KEY) {
      throw new Error('Missing Resend API key');
    }

    const resend = new Resend(import.meta.env.RESEND_API_KEY);
    const formData = await request.formData();

    // Get all form data explicitly
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const linkedin = formData.get('linkedin');
    const coverLetter = formData.get('coverLetter');
    const jobTitle = formData.get('jobTitle');
    const resume = formData.get('resume');
    const emails = JSON.parse(formData.get('emails'));

    // Process resume
    const resumeArrayBuffer = await resume.arrayBuffer();
    const resumeContent = Buffer.from(resumeArrayBuffer).toString('base64');

    // Send email to all recipients
    const emailResponse = await resend.emails.send({
      from: 'Application Alert <resumes@mail.jakesjobs.com>',
      replyTo: 'will@jakesjobs.com',
      to: emails,
      subject: `New Job Application: ${jobTitle} from ${name}`,
      text: `
Job Application Details:

Position: ${jobTitle}
Company: ${formData.get('company')}
Location: ${formData.get('location')}
Job ID: ${formData.get('jobId')}

Applicant Information:
Name: ${name}
Email: ${email}
Phone: ${phone}
LinkedIn: ${linkedin || 'Not provided'}

Cover Letter:
${coverLetter || 'Not provided'}

Thank you!

*This is an automated email.*

support@mail.jakesjobs.com
      `,
      attachments: [
        {
          filename: resume.name,
          content: resumeContent,
          contentType: resume.type,
        },
      ],
    });

    console.log('Email sent successfully:', emailResponse);

    // Log the application to Google Sheets
    await logEmailSent({
      position: jobTitle,
      company: formData.get('company'),
      location: formData.get('location'),
      jobId: formData.get('jobId'),
      applicantName: name,
      email: email,
      phone: phone,
      linkedin: linkedin || '',
      coverLetter: coverLetter || '',
      resendEmailId: emailResponse.data.id
    });

    console.log('Sending to emails:', emails);
    console.log('Email response:', emailResponse);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Send error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
} 