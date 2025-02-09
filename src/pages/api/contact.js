import { Resend } from 'resend';

export const prerender = false;

// Create API endpoint
export async function POST({ request }) {
  try {
    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    if (!import.meta.env.RESEND_API_KEY) {
      throw new Error('Missing Resend API key');
    }

    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const file = formData.get('file');
    const phone = formData.get('phone');

    // Base email config
    const emailConfig = {
      from: 'contact@mail.electrical.jobs.com',
      to: ['will@electrical.jobs.com'],
      subject: `New Contact Form Submission from ${name}`,
      text: `
Contact Form Details:

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}

Thank you!
      `
    };

    // Only add attachment if file is present
    if (file && file.size > 0) {
      const fileArrayBuffer = await file.arrayBuffer();
      const fileContent = Buffer.from(fileArrayBuffer).toString('base64');
      
      emailConfig.attachments = [{
        filename: file.name,
        content: fileContent,
        contentType: file.type,
      }];
    }

    const data = await resend.emails.send(emailConfig);

    return new Response(
      JSON.stringify({
        success: true,
        id: data.id
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}




