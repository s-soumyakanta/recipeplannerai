import { connectDB } from '@/lib/mongo';
import UserPreferences from '@/model/userPreferencesModel';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export const GET = async (req: any) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return new NextResponse(JSON.stringify({ error: 'Invalid or missing user ID' }), { status: 400 });
  }

  await connectDB();

  try {
    const preferences = await UserPreferences.findOne({ userId });
    if (!preferences) {
      return new NextResponse(JSON.stringify({}), { status: 200 });
    }
    return new NextResponse(JSON.stringify(preferences), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Error fetching preferences' }), { status: 500 });
  }
};
