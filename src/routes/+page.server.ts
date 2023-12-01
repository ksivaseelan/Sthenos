import {conn} from '$lib/db/conn';
import {Chat} from '$lib/db/schema';
import {eq} from "drizzle-orm";

export const load = async () => {
    return {streamed: {chat: fetchchat()}}
}

const fetchchat = async () => {
    

    const content = "apple"

    await conn
    .update(Chat)
    .set({content: content})
    .where(eq(Chat.id, 1))
    .returning()

    const chat = await conn
    .select()
    .from(Chat)
    .where(eq(Chat.id, 1));

    return chat[0]
}