import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
async function POST({ request }) {
  try {
    const resend = new Resend("re_7mT7gmiX_GYRvQEx1a2j3RH3NxyTZVW6V");
    if (false) ;
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const file = formData.get("file");
    const phone = formData.get("phone");
    const emailConfig = {
      from: "contact@bestelectricianmail.com",
      to: ["will@bestelectricianjobs.com"],
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
    if (file && file.size > 0) {
      const fileArrayBuffer = await file.arrayBuffer();
      const fileContent = Buffer.from(fileArrayBuffer).toString("base64");
      emailConfig.attachments = [{
        filename: file.name,
        content: fileContent,
        contentType: file.type
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
