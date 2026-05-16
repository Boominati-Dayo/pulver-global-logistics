import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tracking from '@/models/Tracking';

export async function GET(request: NextRequest, { params }: { params: Promise<{ trackingNumber: string }> }) {
  try {
    await connectDB();
    const { trackingNumber } = await params;
    const tracking = await Tracking.findOne({ trackingNumber });
    if (!tracking) return NextResponse.json({ success: false, error: 'Tracking not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: tracking });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch tracking' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ trackingNumber: string }> }) {
  try {
    await connectDB();
    const { trackingNumber } = await params;
    const body = await request.json();
    const { newHistoryEntry, ...updateFields } = body;

    let updateQuery = { ...updateFields, lastUpdated: new Date() };

    if (newHistoryEntry) {
      updateQuery = { $set: { ...updateFields, lastUpdated: new Date() }, $push: { shipmentHistory: newHistoryEntry } };
    }

    const tracking = await Tracking.findOneAndUpdate({ trackingNumber }, updateQuery, { new: true });
    if (!tracking) return NextResponse.json({ success: false, error: 'Tracking not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: tracking });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update tracking' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ trackingNumber: string }> }) {
  try {
    await connectDB();
    const { trackingNumber } = await params;
    const tracking = await Tracking.findOneAndDelete({ trackingNumber });
    if (!tracking) return NextResponse.json({ success: false, error: 'Tracking not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Tracking deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete tracking' }, { status: 500 });
  }
}