import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { EchoRequest, type EchoResponse } from "~/server/proto/example";

export const exampleAPI = createTRPCRouter({
    echo: publicProcedure.input(z.object({ message: z.string() })).query(async ({ input, ctx: { clients } }) => {
        const req = EchoRequest.fromPartial(input)
        return new Promise<EchoResponse>((resolve, reject) => {
            clients.exampleClient.echo(req, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }),
})
