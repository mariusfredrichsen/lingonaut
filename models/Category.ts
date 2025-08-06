import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		languageFrom: { type: String, required: true },
		languageTo: { type: String, required: true },
		description: { type: String, required: false },
		terms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Term" }],
	},
	{ timestamps: true }
);

export const Category =
	mongoose.models.Category || mongoose.model("Category", CategorySchema);
