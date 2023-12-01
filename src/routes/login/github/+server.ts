import type { RequestHandler } from './$types';
import {dev} from "$app/environment"
import {githubAuth} from "$lib/db/conn"

export const GET: RequestHandler = async ({cookies}) => {
    const [url, state] = await githubAuth.getAuthorizationUrl();
    cookies.set("github_oauth_state", state, {
        httpOnly: true,
        secure: !dev,
        path: "/",
        maxAge: 3600
    })
    return new Response(null, {
        status: 302,
        headers: {
            location: url.toString()
        }
    });
};