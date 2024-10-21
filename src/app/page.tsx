import { auth, signIn, signOut } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Button } from "./_components/ui/button";

export default async function Home() {
    const session = await auth()
    let echo = null;

    if (session) {
        echo = await api.example.echo({ message: "Hello AlgoHub" });
    }

    return (
        <HydrateClient>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                        {session && echo?.message}
                        {!session && "Please log in"}
                    </h1>
                    {!session && (
                        <Button onClick={async () => {
                            "use server"
                            try {
                                await signIn("credentials", { email: "test@test.com", password: "password", redirect: false });
                            } catch (err) {
                                console.error(err);
                            }
                        }}
                        >
                            Log in
                        </Button>
                    )}
                    {session && (
                        <Button onClick={async () => {
                            "use server"
                            try {
                                await signOut();
                            } catch (err) {
                                console.error(err);
                            }
                        }}
                        >
                            Log out
                        </Button>
                    )}
                </div>
            </main>
        </HydrateClient>
    );
}
