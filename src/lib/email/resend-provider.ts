'use server'

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

interface SendEmailParams {
  from: string;
  to: string;
  subject: string;
  react: React.ReactElement;
}

export const sendEmail = async ({ from, to, subject, react }: SendEmailParams) => {
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    react,
  });

  if (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
  return data;
}

export default sendEmail