'use client';
import { useEffect, useState } from "react";
import { Course } from "../types/course";
import CourseCard from "./components/CourseCard";



export default function PracticePage() {
    const [courses, setCourses] = useState<Course[]>([])

    const fetchCourses = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/courses", {
                method: "GET"
            });
            console.log(res)


            if (!res.ok) {
                throw new Error("Failed to create course");
            }

            const result = await res.json();
            setCourses(result)
            console.log("Courses fetched:", result);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchCourses()
    }, [])



    return (
        <div>
            Practice page
            {
                courses &&
                courses.map(course => {
                    return <CourseCard
                        course={course}
                    />
                })
            }
        </div>
    );
}
