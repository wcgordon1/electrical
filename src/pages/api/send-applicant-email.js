import { Resend } from 'resend';

export const prerender = false;

export async function POST({ request }) {
  try {
    const resend = new Resend(import.meta.env.RESEND_API_KEY);
    const formData = await request.formData();

    await resend.emails.send({
      from: 'Application Info <Application@mail.electrical.jobs.com>',
      replyTo: 'support@electrical.jobs.com',
      to: formData.get('email'),  // Applicant's email from form
      subject: `${formData.get('jobTitle')}: Application Information`,
      text: `Hi ${formData.get('name')},

Thank you for applying for the ${formData.get('jobTitle')} position at ${formData.get('company')}.

We wish you success with your application and success in your job search. If you end up getting hired, let us know!

Thank you!

Electrical Jobs Team
support@electrical.jobs.com

*This is an automated email.*`
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
} 