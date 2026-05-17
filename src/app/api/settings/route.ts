import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';

export async function GET() {
  try {
    await connectDB();
    const settings = await Settings.find();
    const settingsObj: Record<string, string> = {};
    settings.forEach((s) => { settingsObj[s.key] = s.value; });
    return NextResponse.json({ success: true, data: settingsObj });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const { key, value } = await request.json();
    if (!key || value === undefined) {
      return NextResponse.json({ success: false, error: 'Key and value required' }, { status: 400 });
    }
    const setting = await Settings.findOneAndUpdate(
      { key },
      { key, value },
      { new: true, upsert: true }
    );
    return NextResponse.json({ success: true, data: setting });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update setting' }, { status: 500 });
  }
}