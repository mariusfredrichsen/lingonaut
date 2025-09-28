import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import { Course } from "@/models/Course";

export async function GET(
	request: Request,
	context: { params: Promise<{ id: string }> }
) {
	await dbConnect();

	try {
		const { id } = await context.params;

		const course = await Course.findById(id).populate("terms");

		if (!course) {
			return NextResponse.json(
				{ error: "Course not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(course, { status: 200 });
	} catch (error: any) {
		console.error("GET /api/courses/[id] error:", error);
		return NextResponse.json(
			{ error: error.message || "Internal Server Error" },
			{ status: 500 }
		);
	}
}
