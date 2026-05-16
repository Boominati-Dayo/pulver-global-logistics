import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

interface TrackingEmailData {
  trackingNumber: string;
  shipperName: string;
  shipperEmail: string;
  receiverName: string;
  receiverEmail: string;
  origin: string;
  destination: string;
  expectedDeliveryDate: string;
  status: string;
  currentLocation: string;
  carrier?: string;
  shipmentMode?: string;
  totalFreight?: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    await transporter.sendMail({
      from: `"Global Express Logistics (GEL)" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    console.log(`Email sent to ${options.to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

const getTrackingURL = (trackingNumber: string) => {
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://globalexpresslogistics.com';
  return `${baseURL}/track?tracking=${trackingNumber}`;
};

const getBaseTemplate = (content: string, footerContent?: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Global Express Logistics (GEL)</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); padding: 24px 30px; text-align: center;">
        <h1 style="color: #ea580c; margin: 0; font-size: 22px; font-weight: 700;">Global Express Logistics</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0; font-size: 12px;">Connecting the World Since 2005</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 30px;">
        ${content}
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8f8f8; padding: 30px; border-top: 1px solid #e0e0e0; text-align: center;">
        <p style="color: #1a365d; margin: 0; font-weight: 600; font-size: 14px;">Global Express Logistics (GEL)</p>
        <p style="color: #666; font-size: 12px; margin: 5px 0 0;">Miami, FL, USA | Phone: +1(786)123-4567</p>
        <p style="color: #666; font-size: 12px; margin: 5px 0;">Email: info@globalexpresslogistics.com</p>
        <p style="color: #999; font-size: 11px; margin: 15px 0 0;">© ${new Date().getFullYear()} Global Express Logistics (GEL). All rights reserved.</p>
        ${footerContent || '<p style="color: #999; font-size: 11px; margin: 10px 0 0;">This is an automated message. Please do not reply to this email.</p>'}
      </td>
    </tr>
  </table>
</body>
</html>
`;

const getStatusColor = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes('delivered')) return { bg: '#ea580c', text: '#ffffff' };
  if (s.includes('transit')) return { bg: '#2c5282', text: '#ffffff' };
  if (s.includes('delay') || s.includes('held')) return { bg: '#ef4444', text: '#ffffff' };
  if (s.includes('pending')) return { bg: '#f59e0b', text: '#ffffff' };
  return { bg: '#6b7280', text: '#ffffff' };
};

export async function sendShipperEmail(data: TrackingEmailData): Promise<void> {
  const trackingURL = getTrackingURL(data.trackingNumber);
  const statusColor = getStatusColor(data.status);
  
  const html = getBaseTemplate(`
    <h2 style="color: #1a365d; margin: 0 0 20px; font-size: 20px;">Dear ${data.shipperName},</h2>
    <p style="color: #444; line-height: 1.6; margin: 0 0 25px;">
      Your shipment has been successfully created. You can track your package anytime using the tracking number below.
    </p>
    
    <div style="background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); border-radius: 12px; margin-bottom: 25px; padding: 25px; text-align: center;">
      <p style="color: rgba(255,255,255,0.8); margin: 0 0 5px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Tracking Number</p>
      <p style="color: #ea580c; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 2px;">${data.trackingNumber}</p>
      <span style="display: inline-block; background: ${statusColor.bg}; color: ${statusColor.text}; padding: 6px 16px; border-radius: 20px; margin-top: 15px; font-size: 12px; font-weight: 600;">${data.status}</span>
    </div>
    
    <div style="background: #f8f8f8; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
      <table width="100%">
        <tr>
          <td width="50%" style="padding: 8px 0;">
            <p style="color: #888; margin: 0; font-size: 12px;">Origin</p>
            <p style="color: #1a365d; margin: 3px 0 0; font-weight: 600;">${data.origin}</p>
          </td>
          <td width="50%" style="padding: 8px 0;">
            <p style="color: #888; margin: 0; font-size: 12px;">Destination</p>
            <p style="color: #1a365d; margin: 3px 0 0; font-weight: 600;">${data.destination}</p>
          </td>
        </tr>
        <tr>
          <td width="50%" style="padding: 8px 0;">
            <p style="color: #888; margin: 0; font-size: 12px;">Receiver</p>
            <p style="color: #1a365d; margin: 3px 0 0; font-weight: 600;">${data.receiverName}</p>
          </td>
          <td width="50%" style="padding: 8px 0;">
            <p style="color: #888; margin: 0; font-size: 12px;">Expected Delivery</p>
            <p style="color: #1a365d; margin: 3px 0 0; font-weight: 600;">${data.expectedDeliveryDate}</p>
          </td>
        </tr>
      </table>
    </div>
    
    <div style="text-align: center; padding: 10px 0 20px;">
      <a href="${trackingURL}" style="display: inline-block; background: #ea580c; color: #ffffff; padding: 14px 35px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">Track Your Shipment →</a>
    </div>
    
    <p style="color: #666; font-size: 13px; line-height: 1.6;">
      Need help? Contact our support team at <a href="mailto:info@globalexpresslogistics.com" style="color: #ea580c;">info@globalexpresslogistics.com</a> or call +1(786)123-4567.
    </p>
  `);

  await sendEmail({
    to: data.shipperEmail,
    subject: `Shipment Created - ${data.trackingNumber}`,
    html,
  });
}

export async function sendReceiverEmail(data: TrackingEmailData): Promise<void> {
  const trackingURL = getTrackingURL(data.trackingNumber);
  const statusColor = getStatusColor(data.status);
  
  const html = getBaseTemplate(`
    <h2 style="color: #1a365d; margin: 0 0 20px; font-size: 20px;">Hello ${data.receiverName},</h2>
    <p style="color: #444; line-height: 1.6; margin: 0 0 25px;">
      Great news! A package is on its way to you. You can track its journey using the tracking number below.
    </p>
    
    <div style="background: linear-gradient(135deg, #ea580c 0%, #f97316 100%); border-radius: 12px; margin-bottom: 25px; padding: 25px; text-align: center;">
      <p style="color: rgba(255,255,255,0.9); margin: 0 0 5px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Package On The Way</p>
      <p style="color: #ffffff; margin: 0 0 5px; font-size: 24px; font-weight: 700; letter-spacing: 2px;">${data.trackingNumber}</p>
      <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 13px;">From: ${data.shipperName}</p>
    </div>
    
    <div style="background: #f8f8f8; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
      <table width="100%">
        <tr>
          <td width="50%" style="padding: 8px 0;">
            <p style="color: #888; margin: 0; font-size: 12px;">Origin</p>
            <p style="color: #1a365d; margin: 3px 0 0; font-weight: 600;">${data.origin}</p>
          </td>
          <td width="50%" style="padding: 8px 0;">
            <p style="color: #888; margin: 0; font-size: 12px;">Destination</p>
            <p style="color: #1a365d; margin: 3px 0 0; font-weight: 600;">${data.destination}</p>
          </td>
        </tr>
        <tr>
          <td width="50%" style="padding: 8px 0;">
            <p style="color: #888; margin: 0; font-size: 12px;">Current Location</p>
            <p style="color: #1a365d; margin: 3px 0 0; font-weight: 600;">${data.currentLocation}</p>
          </td>
          <td width="50%" style="padding: 8px 0;">
            <p style="color: #888; margin: 0; font-size: 12px;">Expected Delivery</p>
            <p style="color: #1a365d; margin: 3px 0 0; font-weight: 600;">${data.expectedDeliveryDate}</p>
          </td>
        </tr>
      </table>
    </div>
    
    <div style="text-align: center; padding: 10px 0 20px;">
      <a href="${trackingURL}" style="display: inline-block; background: #1a365d; color: #ffffff; padding: 14px 35px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">Track Your Package →</a>
    </div>
    
    <p style="color: #666; font-size: 13px; line-height: 1.6;">
      Questions about your delivery? Contact us at <a href="mailto:info@globalexpresslogistics.com" style="color: #ea580c;">info@globalexpresslogistics.com</a>.
    </p>
  `);

  await sendEmail({
    to: data.receiverEmail,
    subject: `Package Incoming - ${data.trackingNumber}`,
    html,
  });
}

export async function sendStatusUpdateEmail(data: TrackingEmailData): Promise<void> {
  const statusColor = getStatusColor(data.status);
  const trackingURL = getTrackingURL(data.trackingNumber);
  
  const html = getBaseTemplate(`
    <h2 style="color: #1a365d; margin: 0 0 20px; font-size: 20px;">Shipment Update</h2>
    <p style="color: #444; line-height: 1.6; margin: 0 0 25px;">
      Your shipment status has been updated. Here are the latest details.
    </p>
    
    <div style="background: #f8f8f8; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid ${statusColor.bg}; padding: 20px;">
      <p style="color: #888; margin: 0 0 5px; font-size: 12px;">Current Status</p>
      <p style="color: ${statusColor.bg}; margin: 0 0 15px; font-size: 22px; font-weight: 700; text-transform: uppercase;">${data.status}</p>
      <p style="color: #666; margin: 0; font-size: 13px;"><strong>Location:</strong> ${data.currentLocation}</p>
    </div>
    
    <div style="background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); border-radius: 8px; margin-bottom: 25px; padding: 20px; text-align: center;">
      <p style="color: rgba(255,255,255,0.8); margin: 0 0 5px; font-size: 11px; text-transform: uppercase;">Tracking Number</p>
      <p style="color: #ea580c; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 1px;">${data.trackingNumber}</p>
    </div>
    
    <div style="background: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
      <table width="100%">
        <tr>
          <td width="50%" style="text-align: center; padding: 10px; border-right: 1px solid #e0e0e0;">
            <p style="color: #888; margin: 0; font-size: 11px;">FROM</p>
            <p style="color: #1a365d; margin: 5px 0 0; font-weight: 600;">${data.origin}</p>
          </td>
          <td width="50%" style="text-align: center; padding: 10px;">
            <p style="color: #888; margin: 0; font-size: 11px;">TO</p>
            <p style="color: #1a365d; margin: 5px 0 0; font-weight: 600;">${data.destination}</p>
          </td>
        </tr>
      </table>
    </div>
    
    <div style="text-align: center; padding: 10px 0 20px;">
      <a href="${trackingURL}" style="display: inline-block; background: #ea580c; color: #ffffff; padding: 14px 35px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">View Full Tracking →</a>
    </div>
  `);

  await Promise.all([
    sendEmail({
      to: data.shipperEmail,
      subject: `Status Update - ${data.trackingNumber}`,
      html,
    }),
    sendEmail({
      to: data.receiverEmail,
      subject: `Status Update - ${data.trackingNumber}`,
      html,
    }),
  ]);
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  service?: string;
  message: string;
}): Promise<void> {
  const serviceLabel = data.service ? data.service.charAt(0).toUpperCase() + data.service.slice(1) : 'General Inquiry';
  
  const html = getBaseTemplate(`
    <div style="background: linear-gradient(135deg, #ea580c 0%, #f97316 100%); padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
      <h2 style="color: #ffffff; margin: 0; font-size: 20px;">New Contact Form Submission</h2>
    </div>
    <div style="background: #f8f8f8; padding: 25px; border-radius: 0 0 8px 8px; margin-top: 0;">
      <table width="100%" style="margin-bottom: 20px;">
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><p style="color: #888; margin: 0; font-size: 12px;">Name</p><p style="color: #1a365d; margin: 5px 0 0; font-weight: 600;">${data.name}</p></td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><p style="color: #888; margin: 0; font-size: 12px;">Email</p><p style="color: #1a365d; margin: 5px 0 0; font-weight: 600;">${data.email}</p></td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><p style="color: #888; margin: 0; font-size: 12px;">Phone</p><p style="color: #1a365d; margin: 5px 0 0; font-weight: 600;">${data.phone || 'Not provided'}</p></td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><p style="color: #888; margin: 0; font-size: 12px;">Service Interest</p><p style="color: #1a365d; margin: 5px 0 0; font-weight: 600;">${serviceLabel}</p></td></tr>
        <tr><td style="padding: 10px 0;"><p style="color: #888; margin: 0; font-size: 12px;">Subject</p><p style="color: #1a365d; margin: 5px 0 0; font-weight: 600;">${data.subject}</p></td></tr>
      </table>
      <div style="background: #ffffff; border-radius: 8px; padding: 20px;">
        <p style="color: #888; margin: 0 0 10px; font-size: 12px;">Message</p>
        <p style="color: #444; margin: 0; line-height: 1.6;">${data.message}</p>
      </div>
    </div>
  `);

  await sendEmail({
    to: process.env.SMTP_USER || '',
    subject: `Contact Form: ${data.subject}`,
    html,
  });
}

export async function sendAdminMessage(data: {
  toEmail: string;
  toName: string;
  trackingNumber: string;
  subject: string;
  message: string;
  senderName?: string;
}): Promise<void> {
  const trackingURL = getTrackingURL(data.trackingNumber);
  
  const html = getBaseTemplate(`
    <div style="background: linear-gradient(135deg, #ea580c 0%, #f97316 100%); padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 25px;">
      <p style="color: #ffffff; margin: 0; font-weight: 600; font-size: 14px;">Message from Global Express Logistics (GEL)</p>
    </div>
    
    <h2 style="color: #1a365d; margin: 0 0 20px; font-size: 20px;">Dear ${data.toName},</h2>
    
    <p style="color: #444; line-height: 1.6; margin: 0 0 20px;">
      ${data.message}
    </p>
    
    ${data.senderName ? `<p style="color: #666; font-size: 13px; margin: 0 0 25px;">— ${data.senderName}, GEL Support Team</p>` : ''}
    
    <div style="background: #f8f8f8; border-radius: 8px; margin-bottom: 25px; padding: 15px; text-align: center;">
      <p style="color: #888; margin: 0 0 5px; font-size: 11px;">REFERENCE</p>
      <p style="color: #1a365d; margin: 0; font-weight: 600; letter-spacing: 1px;">${data.trackingNumber}</p>
    </div>
    
    <div style="text-align: center; padding: 10px 0 20px;">
      <a href="${trackingURL}" style="display: inline-block; background: #1a365d; color: #ffffff; padding: 14px 35px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">View Shipment Details →</a>
    </div>
    
    <p style="color: #666; font-size: 13px; line-height: 1.6; border-top: 1px solid #e0e0e0; padding-top: 20px;">
      If you have any questions, please don't hesitate to contact our support team at <a href="mailto:info@globalexpresslogistics.com" style="color: #ea580c;">info@globalexpresslogistics.com</a> or call +1(786)123-4567.
    </p>
  `, '');

  await sendEmail({
    to: data.toEmail,
    subject: data.subject || `Message regarding shipment ${data.trackingNumber}`,
    html,
  });
}

export default transporter;