import mongoose from "mongoose";
import dbConnect from "@/lib/dbconnect";
import { validateRequest } from "@/utils/validateRequest";


export default async function handler(req, res) {
  try {
    await dbConnect();
    const { query, page = 1, limit = 10 } = req.query;

    if (!validateRequest(req)) {
      return res.status(403).json({ message: "Unauthorized request" });
    }

    if (!query) {
      return res.status(200).json({ courses: [], total: 0, totalPages: 0 });
    }

    const collection = mongoose.connection.collection("fiu-classes-collection");

    const searchQuery = {
      $or: [
        { "class name": { $regex: query, $options: "i" } },
        { instructors: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } }
      ]
    };

    // Get total count for pagination
    const total = await collection.countDocuments(searchQuery);
    const totalPages = Math.ceil(total / Number(limit));

    // Get paginated results
    const courses = await collection
      .find(searchQuery)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .toArray();

    res.status(200).json({
      courses,
      total,
      totalPages,
      currentPage: Number(page)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}