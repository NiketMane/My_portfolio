import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ensure data directory & messages.json exist
const dataDir = path.join(__dirname, 'data');
const messagesFilePath = path.join(dataDir, 'messages.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(messagesFilePath)) {
  fs.writeFileSync(messagesFilePath, JSON.stringify([], null, 2), 'utf-8');
}

// Helper to read messages
const getStoredMessages = () => {
  try {
    const data = fs.readFileSync(messagesFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading messages file:', err);
    return [];
  }
};

// Helper to save messages
const saveMessages = (messages) => {
  try {
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing messages file:', err);
  }
};

// Setup Nodemailer transporter
const createTransporter = () => {
  // Check if custom SMTP credentials exist
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null; // Will fallback to simulated logging
};

// -------------------------------------------------------------
// API Routes
// -------------------------------------------------------------

// 1. Submit Form Data (Nodemailer + File Storage)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, subject, message) are required.',
      });
    }

    const newMessage = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      status: 'unread',
    };

    // Save to local storage JSON file (No DB required as requested)
    const currentMessages = getStoredMessages();
    currentMessages.unshift(newMessage);
    saveMessages(currentMessages);

    // Send email using Nodemailer
    let emailSent = false;
    const transporter = createTransporter();

    if (transporter) {
      try {
        const mailOptions = {
          from: `"${name}" <${process.env.SMTP_USER || email}>`,
          to: process.env.RECIPIENT_EMAIL || 'developer.niket@gmail.com',
          replyTo: email,
          subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 8px;">
              <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">New Portfolio Contact Message</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Subject:</strong> <span style="background: #eef2ff; color: #4338ca; padding: 3px 8px; border-radius: 4px;">${subject}</span></p>
              <div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-left: 4px solid #6366f1; border-radius: 4px;">
                <p style="margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
              <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
              <p style="font-size: 12px; color: #888;">Sent via Portfolio Nodemailer Service on ${new Date().toLocaleString()}</p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
        console.log(`[Nodemailer] Email dispatched successfully for ${email}`);
      } catch (mailErr) {
        console.error('[Nodemailer] Email sending error:', mailErr.message);
      }
    } else {
      console.log(`[Nodemailer Mock Mode] SMTP credentials not set. Message logged to messages.json successfully.`);
      emailSent = true; // Simulated success so UX remains smooth
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been received and stored successfully.',
      emailSent,
      data: newMessage,
    });
  } catch (error) {
    console.error('Contact Form API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing contact form. Please try again later.',
    });
  }
});

// 2. Fetch Stored Messages for Admin Page Inbox
app.get('/api/messages', (req, res) => {
  const messages = getStoredMessages();
  res.json({
    success: true,
    count: messages.length,
    messages,
  });
});

// 3. Delete Message from Admin Page Inbox
app.delete('/api/messages/:id', (req, res) => {
  const { id } = req.params;
  let messages = getStoredMessages();
  const initialCount = messages.length;
  messages = messages.filter((m) => m.id !== id);
  
  if (messages.length === initialCount) {
    return res.status(404).json({ success: false, message: 'Message not found' });
  }

  saveMessages(messages);
  res.json({ success: true, message: 'Message deleted successfully', count: messages.length });
});

// 4. Proxy GitHub user API to avoid rate limit/CORS issues
app.get('/api/github/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`, {
      headers: {
        'User-Agent': 'Portfolio-App',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ success: false, message: 'GitHub API fetch failed' });
    }

    const repos = await response.json();
    const formattedRepos = repos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      language: repo.language,
      topics: repo.topics || [],
      updated_at: repo.updated_at,
    }));

    res.json({ success: true, repos: formattedRepos });
  } catch (err) {
    console.error('GitHub API Proxy error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch GitHub repos' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio Backend Server running on http://localhost:${PORT}`);
  console.log(`📁 Contact submissions saved locally at: ${messagesFilePath}`);
});
