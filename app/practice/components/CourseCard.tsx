import { Course } from "@/app/types/course";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import React from "react";


type CourseCardProps = {
    course: Course,
}


const CourseCard = React.memo(function CourseCard({
    course,
}: CourseCardProps) {

    const handleStartPractice = () => {
        console.log(course)
        window.location.href = `/practice/${course._id}`;
    }



    return (
        <div key={course.id} className="flex flex-row justify-between items-center p-4 rounded-2xl shadow-sm bg-secondary-700 w-full">
            <div className="flex flex-col">
                <h2>{course.title}</h2>
                <span>{course.terms.length} terms - by {course.author}</span>
            </div>
            <Button
                onPress={() => { handleStartPractice() }}
            >Practice!</Button>
        </div>
    );
}, (prevProps, nextProps) => {
    return true;
});

export default CourseCard;