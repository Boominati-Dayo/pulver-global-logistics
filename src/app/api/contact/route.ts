import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, service, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Name, email, and message are required' }, { status: 400 });
    }
    await sendContactEmail({ name, email, phone, subject: subject || 'Contact Form', service: service || '', message });
    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Contact email error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}