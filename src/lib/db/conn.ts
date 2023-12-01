import {sql} from "@vercel/postgres";
import {drizzle} from "drizzle-orm/vercel-postgres"
import {lucia} from "lucia"
import {sveltekit} from "lucia/middleware"
import {pg} from "@lucia-auth/adapter-postgresql"
import { dev } from '$app/environment';
import {github} from "@lucia-auth/oauth/providers"
import {GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET} from '$env/static/private';

export const conn = drizzle(sql);

export const auth = lucia({
    adapter: pg(sql, {
        user: "auth_user",
        key: "user_key",
        session: "user_session",
    }),
    env: dev ? 'DEV' : 'PROD',
    middleware: sveltekit(),
    // getUserAttributes: (data) => {
    //     return {
    //         username:data.username
    //     }
    // }
});

export const githubAuth = github(auth, {
	clientId: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET
});

export type Auth = typeof auth;
