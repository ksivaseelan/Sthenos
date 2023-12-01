// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import("$lib/db.conn").Auth;
		type DatabaseUserAttributes = {
			username: string;
		};
		type DatabaseSessionAttributes = {}
	}
	declare namespace App {
		interface Locals {
			auth: import("lucia").AuthRequest;
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}


export {}
