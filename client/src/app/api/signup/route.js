import AadharModel from '@/app/models/Aadhar';
import dbConnect from '@/app/utils/dbConnect';
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { name, phoneNumber, aadharNumber } = await req.json();
        await dbConnect(); // Connect to the database

        // Check if Aadhar number exists in the database
        const existingAadhar = await AadharModel.findOne({ aadharNumber });
        if (existingAadhar) {
            return NextResponse.json(
                { error: 'Aadhar number already registered' },
                { status: 400, statusText: 'Aadhar number already registered' }
            );
        }

        // Create a new Aadhar entry
        await AadharModel.create({ name, phoneNumber, aadharNumber });
        return NextResponse.json({ message: 'Aadhar registered successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Server error' },
            { status: 500, statusText: 'Server error' }
        );
    }
}
