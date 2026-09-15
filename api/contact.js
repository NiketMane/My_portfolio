import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields (name, email, subject, message) are required.',
    });
  }

  const smtpUser = process.env.SMTP_USER?.replace(/["']/g, '').trim();
  const smtpPass = process.env.SMTP_PASS?.replace(/[\s"']/g, '');
  const recipientEmail = (process.env.RECIPIENT_EMAIL || smtpUser || 'niketbmane@gmail.com').replace(/["']/g, '').trim();

  if (!smtpUser || !smtpPass) {
    return res.status(500).json({
      success: false,
      message: 'SMTP credentials not configured. Please add SMTP_USER and SMTP_PASS to your Vercel Environment Variables.',
    });
  }

  try {
    const isCustomHost = Boolean(process.env.SMTP_HOST);
    const transporter = nodemailer.createTransport(
      isCustomHost
        ? {
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587', 10),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          }
        : {
            service: 'gmail',
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          }
    );

    const mailOptions = {
      from: `"${name}" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #333; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 12px; margin-top: 0;">New Portfolio Contact Message</h2>
          <p style="margin: 8px 0;"><strong>Sender Name:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #6366f1;">${email}</a></p>
          <p style="margin: 8px 0;"><strong>Subject:</strong> <span style="background: #eef2ff; color: #4338ca; padding: 4px 10px; border-radius: 6px; font-weight: 600;">${subject}</span></p>
          <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-left: 4px solid #6366f1; border-radius: 6px;">
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #1e293b;">${message}</p>
          </div>
          <hr style="margin-top: 28px; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="font-size: 12px; color: #94a3b8; margin: 0;">Sent via Portfolio Contact Form on ${new Date().toLocaleString()}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been delivered to my inbox.',
    });
  } catch (error) {
    console.error('[Vercel Serverless] Email dispatch error:', error);
    return res.status(500).json({
      success: false,
      message: 'Email dispatch failed: ' + (error.message || 'Unknown error'),
    });
  }
}
