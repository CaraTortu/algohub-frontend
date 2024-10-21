import { NextResponse } from "next/server"
import { auth, authOptions } from "~/server/auth"

export default auth((req) => {
    const signinUrl = req.nextUrl.clone()
    signinUrl.pathname = authOptions.pages?.signIn ?? "/"

    return !!req.auth ? NextResponse.next() : NextResponse.redirect(signinUrl)
})

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*"]
}
