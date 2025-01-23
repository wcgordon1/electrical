import { Resend } from 'resend';

export const prerender = false;

export async function POST({ request }) {
  try {
    const resend = new Resend(import.meta.env.RESEND_API_KEY);
    const formData = await request.formData();

    await resend.emails.send({
      from: 'Application Alert <application@bestelectricianmail.com>',
      replyTo: 'hello@bestelectricianjobs.com',
      to: formData.get('email'),  // Applicant's email from form
      subject: `${formData.get('jobTitle')}: Application Information`,
      text: `Hi ${formData.get('name')},

Thank you for applying for the ${formData.get('jobTitle')} position at ${formData.get('company')}.

We wish you success with your application and success in your job search. If you end up getting hired, let us know!

PS

We're giving away a hundred dollar Amazon Gift Card every month to someone who follows, likes, and reposts our Facebook page. 

Extra points if you tag a friend. Help us grow this job board into the best Electrical Job Board in America! 

https://www.facebook.com/bestelectricianjobs
- Follow us on Facebook for up to date job postings and giveaways.

OR

Consider joining our Subreddit:
https://www.reddit.com/r/ElectricalJobs/

Thank you!
Jake's Jobs Team

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