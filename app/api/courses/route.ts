import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import { Term } from "@/models/Term";
import { Course } from "@/models/Course";

export async function POST(request: Request) {
	await dbConnect();

	try {
		const body = await request.json();

		const {
			title,
			termLanguage,
			definitionLanguage,
			author,
			description,
			terms = [],
		} = body;

		// Validate required fields
		if (!title || !termLanguage || !definitionLanguage || !author) {
			return NextResponse.json(
				{
					error: "title, termLanguage, definitionLanguage, and author are required",
				},
				{ status: 400 }
			);
		}

		const savedTerms = await Promise.all(
			terms.map(async (term: any) => {
				const { id, categories, ...rest } = term;

				const saved = await Term.findOneAndUpdate(
					{
						term: rest.term,
						definition: rest.definition,
						termLanguage: rest.termLanguage,
						definitionLanguage:
							rest.definitionLanguage,
					},
					{
						$set: {
							description:
								rest.description ||
								"",
						},
					},
					{ new: true, upsert: true }
				);
				return saved;
			})
		);

		const course = await Course.findOneAndUpdate(
			{ title, author, termLanguage, definitionLanguage },
			{
				$set: {
					title,
					description,
					termLanguage,
					definitionLanguage,
					terms: savedTerms.map((t) => t._id),
				},
			},
			{ new: true, upsert: true }
		);

		return NextResponse.json(
			{ message: "Course created", course },
			{ status: 201 }
		);
	} catch (error: any) {
		console.error("POST /api/courses error:", error);
		return NextResponse.json(
			{ error: error.message || "Internal Server Error" },
			{ status: 500 }
		);
	}
}
