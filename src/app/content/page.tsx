import { api, HydrateClient } from "~/trpc/server";

export default async function Content() {
    const courses = await api.course.getCourses();
    console.log(courses);
    const course_details = await api.course.getCourse({ id: "5408828f-22e6-4ae5-ac38-9f221a2edde6" });
    console.log(course_details);

    return (
        <HydrateClient>
            <h1>Content</h1>
        </HydrateClient>
    )
}
