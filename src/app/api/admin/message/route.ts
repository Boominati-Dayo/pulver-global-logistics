import { NextRequest, NextResponse } from 'next/server';
import { sendAdminMessage } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { toEmail, toName, trackingNumber, subject, message, senderName } = await request.json();

    if (!toEmail || !trackingNumber || !message) {
      return NextResponse.json(
        { success: false, error: 'Email, tracking number, and message are required' },
        { status: 400 }
      );
    }

    await sendAdminMessage({
      toEmail,
      toName: toName || 'Valued Customer',
      trackingNumber,
      subject: subject || `Message regarding shipment ${trackingNumber}`,
      message,
      senderName: senderName || 'Global Express Logistics Team',
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Admin message error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}