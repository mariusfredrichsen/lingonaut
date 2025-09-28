'use client';
import { useEffect, useState } from "react";
import { Course } from "../../types/course";
import CourseCard from "../components/CourseCard";
import { useParams } from "next/navigation";



export default function PracticePage() {
    const [course, setCourse] = useState<Course | null>(null)
    const { id } = useParams<{ id: string }>();


    const fetchCourseById = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:3000/api/courses/${id}`, {
                method: "GET"
            });
            if (!res.ok) {
                throw new Error("Failed to fetch course");
            }
            const result = await res.json();
            setCourse(result);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (id) {
            fetchCourseById(id);
        }
    }, [])



    return (
        <div>
            {
                course &&
                <h1>{course.title}</h1>
            }
        </div>
    );
}
