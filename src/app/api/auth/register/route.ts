import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { email, password, name } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
    }
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ success: false, error: 'User already exists' }, { status: 409 });
    }
    const hashedPassword = hashPassword(password);
    const userCount = await User.countDocuments();
    const user = new User({
      email: email.toLowerCase(), password: hashedPassword,
      name: name || email.split('@')[0],
      role: userCount === 0 ? 'admin' : 'user',
      permissions: userCount === 0 ? ['all'] : []
    });
    await user.save();
    return NextResponse.json({ success: true, data: { user: { id: user._id, email: user.email, name: user.name, role: user.role } } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Registration failed' }, { status: 500 });
  }
}