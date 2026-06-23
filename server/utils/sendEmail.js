const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html, text }) => {
  // If we are using mock mode, just log to stdout
  if (process.env.USE_MOCK_EMAIL === 'true') {
    console.log('\n=======================================');
    console.log(`[MOCK EMAIL SENT]`);
    console.log(`TO: ${to}`);
    console.log(`SUBJECT: ${subject}`);
    console.log(`TEXT CONTENT: ${text}`);
    console.log('=======================================\n');
    return { mock: true, success: true };
  }

  const host = process.env.EMAIL_HOST || process.env.SMTP_HOST;
  const port = parseInt(process.env.EMAIL_PORT || process.env.SMTP_PORT || '465', 10);
  const user = process.env.EMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

  // Validate credentials when not in mock mode
  if (process.env.USE_MOCK_EMAIL !== 'true') {
    if (!user || !pass) {
      console.error('Email credentials not set. Check EMAIL_USER and EMAIL_PASS in environment variables.');
      throw new Error('Email credentials missing');
    }
  }

  const smtpConfig = {
    auth: {
      user: user,
      pass: pass,
    },
    connectionTimeout: 5000, // 5 seconds timeout
    socketTimeout: 5000,     // 5 seconds socket timeout
  };

  // Setup transporter dynamically
  if (host) {
    console.log(`SMTP Connection Attempt: Host=${host}, Port=${port}`);
    smtpConfig.host = host;
    smtpConfig.port = port;
    
    // Automatically set secure: false for STARTTLS ports (587, 25) unless secure is explicitly set
    const secureEnv = process.env.EMAIL_SECURE || process.env.SMTP_SECURE;
    if (secureEnv !== undefined) {
      smtpConfig.secure = secureEnv === 'false' ? false : true;
    } else {
      smtpConfig.secure = (port === 587 || port === 25) ? false : true;
    }
    console.log(`SMTP Transporter Secure option set to: ${smtpConfig.secure}`);
  } else {
    console.log('No SMTP_HOST specified in environment. Defaulting to standard Gmail service configuration.');
    smtpConfig.service = 'gmail';
  }

  const transporter = nodemailer.createTransport(smtpConfig);

  const mailOptions = {
    from: `"AI Cold Mail Generator" <${user || 'no-reply@gmail.com'}>`,
    to,
    subject,
    text,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`Email dispatched: ${info.messageId}`);
  return info;
};

module.exports = sendEmail;
