import * as grpc from '@grpc/grpc-js'
import { env } from '~/env'
import { ExampleClient } from '../proto/example'

/* Helpers */
export const getMetadata = ({ token }: { token?: string }) => {
    const metadata = new grpc.Metadata();

    if (token) {
        metadata.set("authorization", "bearer " + token);
    }

    return metadata
}

/* Services */
const config: grpc.ClientOptions = {
    // 2MB max message size
    "grpc.max_receive_message_length": 1024 * 1024 * 2,
}

const credentials = grpc.credentials.createInsecure()
const exampleClient = new ExampleClient(env.BACKEND_URL, credentials, config);

export const clients = {
    exampleClient
}
