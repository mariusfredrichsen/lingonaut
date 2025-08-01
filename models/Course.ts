import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
	{
		_id: String,
		title: { type: String, required: true },
		languageFrom: { type: String, required: true },
		languageTo: { type: String, required: true },
		description: { type: String },
		author: { type: String, required: true },
		categories: [{ type: String, ref: "Category" }],
	},
	{ timestamps: true }
);
