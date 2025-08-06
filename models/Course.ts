import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		languageFrom: { type: String, required: true },
		languageTo: { type: String, required: true },
		description: { type: String, required: false },
		author: { type: String, required: true },
		terms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Term" }],
		categories: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Category",
			},
		],
	},
	{ timestamps: true }
);

export const Course =
	mongoose.models.Course || mongoose.model("Course", CourseSchema);
