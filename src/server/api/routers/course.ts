import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { GetCourseRequest, type GetCourseResponse, type GetCoursesResponse } from "~/server/proto/course";
import { Empty } from "~/server/proto/google/protobuf/empty";

export const courseAPI = createTRPCRouter({
    getCourses: publicProcedure.query(async ({ ctx: { clients } }) => {
        return await new Promise<GetCoursesResponse>((resolve, reject) => {
            clients.courseClient.getCourses(Empty, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }),

    getCourse: publicProcedure.input(z.object({
        id: z.string(),
    })).query(async ({ input, ctx: { clients } }) => {
        const req = GetCourseRequest.fromPartial(input)

        return await new Promise<GetCourseResponse>((resolve, reject) => {
            clients.courseClient.getCourse(req, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }),
})
