import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';

export async function POST() {
  try {
    await connectDB();
    const defaults = [
      { key: 'phone', value: '+1 (555) 123-4567' },
      { key: 'email', value: 'info@pulvergloballogistics.com' },
    ];
    for (const item of defaults) {
      await Settings.findOneAndUpdate({ key: item.key }, item, { upsert: true });
    }
    return NextResponse.json({ success: true, message: 'Settings initialized' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to initialize settings' }, { status: 500 });
  }
}