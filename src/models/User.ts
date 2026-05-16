import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string; password: string; name: string;
  role: 'admin' | 'user' | 'manager'; permissions: string[];
  createdAt: Date; updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ['admin', 'user', 'manager'], default: 'user' },
    permissions: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);