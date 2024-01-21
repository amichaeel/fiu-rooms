import mongoose from 'mongoose';
import dbConnect from '@/lib/dbconnect';

export default async function handler(req, res) {
  try {
    dbConnect();
    const collection = mongoose.connection.collection('fiu-classes-collection');
    const { building } = req.query;
    console.log(building)
    const cursor = await collection.find({
      location: { $regex: building, $options: 'i' }
    }).toArray();
    res.status(200).json(cursor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}