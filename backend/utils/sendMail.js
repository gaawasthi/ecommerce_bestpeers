import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async ({ email, subject, html }) => {
  try {
    await resend.emails.send({
      from: "MyApp <onboarding@resend.dev>",
      to: email,
      subject,
      html,
    });
  } catch (error) {
    console.error("Email Send Error:", error);
  }
};

export default sendMail;
