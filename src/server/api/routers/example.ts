import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { EchoRequest, type EchoResponse } from "~/server/proto/example";
import { getMetadata } from "~/server/api/grpc";

export const exampleAPI = createTRPCRouter({
    echo: protectedProcedure.input(z.object({ message: z.string() })).query(async ({ input, ctx: { clients, session } }) => {
        const req = EchoRequest.fromPartial(input)
        const metadata = getMetadata({ token: session?.user.grpcToken })

        return new Promise<EchoResponse>((resolve, reject) => {
            clients.exampleClient.echo(req, metadata, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }),
})
