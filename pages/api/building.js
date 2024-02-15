import mongoose from "mongoose";
import dbConnect from "@/lib/dbconnect";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const { building } = await req.query;
    if (!building) {
      return res
        .status(400)
        .json({ message: "BUilding parameter is required" });
    }
    const collection = mongoose.connection.collection("fiu-classes-collection");
    const cursor = await collection
      .find({
        location: { $regex: building, $options: "i" },
      })
      .toArray();
    res.status(200).json(cursor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
