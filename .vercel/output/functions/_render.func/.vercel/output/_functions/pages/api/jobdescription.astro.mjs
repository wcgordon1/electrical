import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
async function POST({ request }) {
  try {
    const resend = new Resend("re_7mT7gmiX_GYRvQEx1a2j3RH3NxyTZVW6V");
    if (false) ;
    const formData = await request.formData();
    const companyName = formData.get("companyName");
    const contactEmail = formData.get("contactEmail");
    const phoneNumber = formData.get("phoneNumber");
    const jobTitle = formData.get("jobTitle");
    const jobDescription = formData.get("jobDescription");
    const experience = formData.get("experience");
    const payRate = formData.get("payRate");
    const location = formData.get("location");
    const jobUrl = formData.get("jobUrl");
    const comments = formData.get("comments");
    const attachments = formData.get("attachments");
    const emailConfig = {
      from: "jobs@bestelectricianmail.com",
      to: ["will@bestelectricianjobs.com"],
      subject: `New Job Posting: ${jobTitle} at ${companyName}`,
      text: `
New Job Posting Details:

Company Information:
Company Name: ${companyName}
Contact Email: ${contactEmail}
Phone Number: ${phoneNumber}

Job Details:
Title: ${jobTitle}
Location: ${location}
Pay Rate: ${payRate}
Experience Required: ${experience}

Job Description:
${jobDescription}

Additional Information:
Job URL: ${jobUrl || "Not provided"}
Comments: ${comments || "None"}

Thank you!
      `
    };
    if (attachments && attachments.size > 0) {
      const attachmentBuffer = await attachments.arrayBuffer();
      const attachmentContent = Buffer.from(attachmentBuffer).toString("base64");
      emailConfig.attachments = [{
        filename: attachments.name,
        content: attachmentContent,
        contentType: attachments.type
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
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
