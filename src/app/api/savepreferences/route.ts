import { connectDB } from '@/lib/mongo';
import UserPreferences from '@/model/userPreferencesModel';
import { NextResponse } from 'next/server';

export const POST = async (req: { json: () => any; }) => {
  await connectDB();
  let data;

  try {
    data = await req.json();
    console.log('Received data:', data);
  } catch (error) {
    console.error('Error parsing request JSON:', error);
    return new NextResponse(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { userId, ...preferencesData } = data;

  try {
    const existingPreferences = await UserPreferences.findOne({ userId });

    if (existingPreferences) {
      // Update existing document
      await UserPreferences.updateOne({ userId }, { $set: preferencesData });
      console.log('Preferences updated successfully');
      return new NextResponse(JSON.stringify({ message: 'Preferences updated' }), { status: 200 });
    } else {
      // Create new document
      const userPreferences = new UserPreferences(data);
      await userPreferences.save();
      console.log('Preferences saved successfully');
      return new NextResponse(JSON.stringify({ message: 'Preferences saved' }), { status: 201 });
    }
  } catch (error) {
    console.error('Error saving preferences:', error);
    return new NextResponse(JSON.stringify({ error: 'Error saving preferences' }), { status: 500 });
  }
};
