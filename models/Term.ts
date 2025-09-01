import mongoose from "mongoose";

const TermSchema = new mongoose.Schema(
	{
		term: { type: String, required: true },
		definition: { type: String, required: true },
		termLanguage: { type: String, required: true },
		definitionLanguage: { type: String, required: true },
		description: { type: String, required: false },
	},
	{ timestamps: true }
);

export const Term = mongoose.models.Term || mongoose.model("Term", TermSchema);
