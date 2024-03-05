import Aadhar from '../../app//schema/Aadhar';
import dbConnect from '../utils/dbConnect';


export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();

    switch (method) {
        case 'POST':
            try {
                const { name, phoneNumber, aadharNumber } = req.body;

                // Check if Aadhar number exists in database
                const existingUser = await Aadhar.findOne({ aadharNumber });
                if (existingUser) {
                    return res.status(400).json({ error: 'Aadhar number already registered' });
                }

                // Create new user
                const newUser = new Aadhar({ name, phoneNumber, aadharNumber });
                await newUser.save();

                // Respond with success message
                res.json({ message: 'Account created successfully' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
