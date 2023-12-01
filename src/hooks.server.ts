import {auth} from "$lib/db/conn"
import type {Handle} from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
	// we can pass `event` because we used the SvelteKit middleware
	event.locals.auth = auth.handleRequest(event);
    console.log("Hooks:",  await event.locals.auth.validate())
	return await resolve(event);
};