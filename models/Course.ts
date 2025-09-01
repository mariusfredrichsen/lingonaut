import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		termLanguage: { type: String, required: true },
		definitionLanguage: { type: String, required: true },
		description: { type: String, required: false },
		author: { type: String, required: true },
		terms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Term" }],
	},
	{ timestamps: true }
);

export const Course =
	mongoose.models.Course || mongoose.model("Course", CourseSchema);
