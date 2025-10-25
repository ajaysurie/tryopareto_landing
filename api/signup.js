import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get SendGrid API key from environment variable
  const apiKey = process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    console.error('SENDGRID_API_KEY not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  sgMail.setApiKey(apiKey);

  // Extract form data
  const { fullName, email, company, tradeType, phone } = req.body;

  // Basic validation
  if (!fullName || !email || !company) {
    return res.status(400).json({ error: 'Name, email, and company are required' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Build email content
  const emailBody = `
New Early Access Signup

Name: ${fullName}
Email: ${email}
Company: ${company || 'Not provided'}
Trade Type: ${tradeType || 'Not specified'}
Phone: ${phone || 'Not provided'}

Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
  `.trim();

  const msg = {
    to: 'form@opareto.com',
    from: 'hello@opareto.com', // Must be verified sender in SendGrid
    subject: `New Early Access Signup: ${fullName}`,
    text: emailBody,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a; border-bottom: 3px solid #fbbf24; padding-bottom: 10px;">
          New Early Access Signup
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; background: #f5f5f5; font-weight: bold; width: 150px;">Name:</td>
            <td style="padding: 10px; background: #fafafa;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Email:</td>
            <td style="padding: 10px; background: #fafafa;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Company:</td>
            <td style="padding: 10px; background: #fafafa;">${company || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Trade Type:</td>
            <td style="padding: 10px; background: #fafafa;">${tradeType || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Phone:</td>
            <td style="padding: 10px; background: #fafafa;">${phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Submitted:</td>
            <td style="padding: 10px; background: #fafafa;">${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}</td>
          </tr>
        </table>
      </div>
    `
  };

  try {
    console.log('Attempting to send email to:', msg.to);
    const result = await sgMail.send(msg);
    console.log('Email sent successfully:', result);
    return res.status(200).json({
      success: true,
      message: 'Signup received successfully'
    });
  } catch (error) {
    console.error('SendGrid error - Full details:');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    if (error.response) {
      console.error('Response body:', JSON.stringify(error.response.body, null, 2));
      console.error('Response status:', error.response.statusCode);
    }
    console.error('Full error:', error);
    return res.status(500).json({
      error: 'Failed to process signup. Please try again.',
      details: error.message
    });
  }
}
