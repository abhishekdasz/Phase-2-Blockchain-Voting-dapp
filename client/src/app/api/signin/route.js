import AadharModel from '@/app/models/Aadhar';
import dbConnect from '@/app/utils/dbConnect';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { name, phoneNumber, aadharNumber } = await req.json();

        // Connect to the database
        await dbConnect();

        // Check if the provided details match an entry in the database
        const user = await AadharModel.findOne({ name, phoneNumber, aadharNumber });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // If the user is found, you can perform additional actions like creating a session, etc.
        
        // Return a success response
        return NextResponse.json({ message: 'Sign in successful' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
