import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { auth } from "$lib/db/conn";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
    
    
	if (!session) throw redirect(302, "/login");
	return {
		userId: session.user.userId,
		githubUsername: session.user.githubUsername
	};
};

export const actions: Actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
        
        
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId); // invalidate session
       
		locals.auth.setSession(null); // remove cookie
        
		throw redirect(302, "/login"); // redirect to login page
        
	}
};